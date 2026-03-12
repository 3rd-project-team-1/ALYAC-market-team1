# Alyac Market

SNS 기반 오픈마켓 웹 애플리케이션입니다.

## 프로젝트 한눈에 보기

- 기간: 이스트소프트 프론트엔드 10기 3차 프로젝트
- 목표: 모바일 친화적인 SNS + 상품 거래 서비스 구현
- 팀: 김동희, 김세윤, 배준우, 장영재

## 주요 기능

- 인증: 회원가입, 로그인, 토큰 갱신
- 프로필: 조회, 수정, 팔로우/언팔로우
- 피드: 팔로잉 게시글 조회, 무한 스크롤
- 게시글: 작성, 수정, 삭제, 이미지 업로드
- 상품: 등록, 수정, 삭제, 조회
- 검색: 계정명 기반 사용자 검색
- 채팅: 채팅 목록/채팅방 UI

## 기술 스택

- Frontend: React 19, TypeScript, Vite
- Routing: React Router DOM
- Data Fetching: TanStack Query
- State: Zustand
- Form/Validation: React Hook Form, Zod
- Styling/UI: Tailwind CSS, Radix UI, shadcn/ui, CVA
- API: Axios
- Backend(Mock): Node.js, Express, JSON Server

## 빠른 시작

### 1) 백엔드 실행

프로젝트 루트에서 실행:

```bash
npm install
npm run start
```

### 2) 프론트엔드 실행

3rd-project 폴더에서 실행:

```bash
cd 3rd-project
npm install
npm run dev
```

## 라우팅 요약

- 비인증: /, /signin, /signup, /signup/profile
- 인증: /feed, /search, /profile, /post/:postId, /create-post, /create-product 등

자세한 라우트는 src/app/routes.tsx를 확인하세요.

## 프로젝트 구조

FSD(Feature-Sliced Design) 구조를 사용합니다.

```text
src/
  app/        # 앱 진입점, 라우팅, 전역 Provider
  pages/      # 라우트 단위 페이지
  widgets/    # 화면 조합 UI 블록
  features/   # 사용자 시나리오 단위 기능
  entities/   # 도메인 모델/API/훅
  shared/     # 공통 유틸, UI, API
```

## 데이터 흐름 요약

- 클라이언트는 /api 경로로 요청 (Vite Proxy)
- 서버 상태는 TanStack Query로 관리
- 인증 토큰은 저장소에 보관 후 인터셉터로 자동 첨부
- 만료 시 토큰 재발급 후 요청 재시도

## 문서

- 구조/규칙: FSDguide.md, TEAM_CONVENTIONS.md
- 상세 가이드: GUIDE/PROJECT_GUIDE.md, GUIDE/SHADCN_GUIDE.md, GUIDE/ZOD_GUIDE.md

## 배포

- 프론트엔드: 추후 업데이트
- 백엔드: 추후 업데이트
