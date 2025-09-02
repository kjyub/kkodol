# Cursor MCP 서버 설정 가이드

이 폴더는 Cursor에서 MCP(Model Context Protocol) 서버를 설정하기 위한 구성 파일들을 포함합니다.

## 🚀 빠른 설정

### 1. 설정 파일 복사

```bash
cp .cursor/config.example.json .cursor/config.json
```

### 2. Figma 설정

1. [Figma](https://figma.com) 로그인
2. **Settings** > **Account** > **Personal access tokens**
3. **Create new token** 클릭
4. 토큰을 복사하여 `.cursor/config.json`의 `FIGMA_ACCESS_TOKEN`에 설정

### 3. Supabase 설정

1. [Supabase](https://supabase.com) 프로젝트 대시보드 이동
2. **Settings** > **API** 메뉴
3. 다음 값들을 복사:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY`

## 📁 파일 설명

- `config.json` - 실제 MCP 서버 설정 (Git에서 제외됨)
- `config.example.json` - 설정 템플릿
- `mcp-settings.json` - 설정 가이드 및 설명
- `README.md` - 이 파일

## 🔒 보안 주의사항

- `config.json` 파일은 민감한 정보를 포함하므로 Git에 커밋하지 마세요
- API 키는 절대 공개 저장소에 업로드하지 마세요
- 토큰이 노출되었다면 즉시 재생성하세요

## 🛠️ MCP 서버 기능

### Figma MCP

- 📋 Figma 파일 및 컴포넌트 정보 조회
- 🎨 디자인 토큰 자동 추출
- 🖼️ 이미지 및 에셋 내보내기
- 📏 스타일 가이드 생성

### Supabase MCP

- 🗄️ 데이터베이스 스키마 및 데이터 관리
- 👤 사용자 인증 및 권한 관리
- 📁 파일 스토리지 관리
- 🔄 실시간 데이터 동기화

## 🚨 문제 해결

### MCP 서버가 연결되지 않는 경우

1. Cursor를 재시작해보세요
2. API 키가 올바른지 확인하세요
3. 네트워크 연결을 확인하세요

### 권한 오류가 발생하는 경우

1. Figma/Supabase 계정 권한을 확인하세요
2. 토큰이 만료되지 않았는지 확인하세요
3. 프로젝트 접근 권한이 있는지 확인하세요
