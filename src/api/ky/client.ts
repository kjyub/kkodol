import ky, { HTTPError, type Options as KyOptions, type KyResponse } from 'ky';
import { SignJWT } from 'jose';

const client = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
});

interface Config {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, string>;
  data?: unknown;
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer';
  headers?: { [key: string]: string };
}

interface Options extends KyOptions {}

// 응답 형식을 Supabase와 유사하게 정의합니다.
interface ApiResponse<T> {
  data: T;
  error: { message: string; [key: string]: any } | null;
  count: number | null;
}

const getToken = async () => {
  const secret = import.meta.env.VITE_API_TOKEN;

  const encoder = new TextEncoder();
  const key = encoder.encode(secret);

  const jwt = await new SignJWT({
    role: 'anon',
    sub: 'kjyub08',
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1시간 유효
  })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(key);

  return jwt;
};

const instance = async <T>(
  { url, method, params, data, headers }: Config,
  options?: Options,
): Promise<ApiResponse<T>> => {
  try {
    const token = await getToken();

    const response: KyResponse = await client(url.substring(1), {
      method,
      searchParams: params,
      ...(data ? { json: data } : {}),
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        // PostgREST를 위해 count를 요청하는 헤더를 추가합니다.
        Prefer: 'count=exact',
        ...headers,
      },
    });

    // PostgREST는 Content-Range 헤더에 전체 카운트를 반환합니다.
    const contentRangeHeader = response.headers.get('content-range');
    let count = null;
    if (contentRangeHeader) {
      const match = contentRangeHeader.match(/\/(\d+)/);
      if (match && match[1]) {
        count = parseInt(match[1], 10);
      }
    }

    // 응답 본문을 먼저 텍스트로 읽습니다.
    const responseText = await response.text();

    // 응답 본문이 비어있으면, 데이터 없음을 나타내는 성공 응답을 반환합니다.
    if (!responseText) {
      return {
        data: {} as T,
        error: null,
        count,
      };
    }

    // 응답 본문이 있는 경우에만 JSON으로 파싱합니다.
    const responseData: T = JSON.parse(responseText);

    return {
      data: responseData,
      error: null,
      count,
    };
  } catch (e) {
    if (e instanceof HTTPError) {
      console.error(' ⨯', e.request.url);
      try {
        // 에러 응답 본문을 파싱하여 에러 객체로 만듭니다.
        const errorBody = await e.response.json();
        return {
          data: {} as T,
          error: {
            message: errorBody.message || e.message,
            ...errorBody,
          },
          count: null,
        };
      } catch (parseError) {
        // 에러 본문 파싱 실패 시
        return {
          data: {} as T,
          error: { message: e.message },
          count: null,
        };
      }
    }

    // 네트워크 에러 등 기타 에러
    return {
      data: {} as T,
      error: { message: (e as Error).message },
      count: null,
    };
  }
};

export default instance;
