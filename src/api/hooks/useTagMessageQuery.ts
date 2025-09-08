import { useInfiniteQuery } from '@tanstack/react-query';
import { getTagMessages } from '@/api/ky/queries';
import { validateDate } from '@/utils/api';
import { useAuth } from '@/context/AuthProvider';

export function useTagMessageQuery(
  dateStart?: string,
  dateEnd?: string,
  memberExcludes?: string[],
  tags?: string[],
  mode?: 'any' | 'all',
) {
  const { isAuthenticated } = useAuth();

  return useInfiniteQuery({
    queryKey: [
      'kkotalkTagMessages',
      dateStart,
      dateEnd,
      memberExcludes,
      tags,
      mode,
    ],
    queryFn: ({ pageParam, queryKey }) =>
      getTagMessages({
        cursorDate: pageParam?.cursor_date as string,
        cursorId: pageParam?.cursor_id as number,
        limitRows: 50,
        dateStart: validateDate(queryKey[1] as string),
        dateEnd: validateDate(queryKey[2] as string),
        memberExcludes: queryKey[3] as string[],
        tags: queryKey[4] as string[],
        mode: queryKey[5] as 'any' | 'all',
      }),
    initialPageParam: null as null | { cursor_date: string; cursor_id: number },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.length) return null;
      const last = lastPage[lastPage.length - 1]; // ← 페이지의 '마지막'(가장 오래된)
      return { cursor_date: last.date, cursor_id: last.id } as {
        cursor_date: string;
        cursor_id: number;
      };
    },
    staleTime: 1000 * 60 * 1, // 1분 동안 fresh
    gcTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    enabled: isAuthenticated, // 인증되었을 때만 쿼리 실행
  });
}
