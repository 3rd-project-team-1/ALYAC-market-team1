# 프로젝트 진행중 FSD 정리법

이 프로젝트는 Feature-Sliced Design(FSD) 구조를 기반으로 구성되었습니다. 레이어별 책임을 분리해 확장성과 유지보수성을 높입니다.

## 레이어 한눈에

| 레이어   | 역할                          | 넣는 것                                                | 넣지 않는 것                               |
| -------- | ----------------------------- | ------------------------------------------------------ | ------------------------------------------ |
| app      | 엔트리, 라우팅, 전역 레이아웃 | `main.tsx`, `routes.tsx`, 전역 스타일, 최상단 레이아웃 | 도메인 로직, 화면 전용 상태, API 호출 로직 |
| pages    | 라우트 단위 화면 조립         | 페이지 전용 컨테이너, 페이지 수준 데이터 조립          | 재사용 UI 조각(가능하면 widgets/shared)    |
| widgets  | 페이지 간 재사용 섹션         | 여러 피처/엔티티 합친 큰 UI 블록                       | 단일 도메인 로직, 단일 행동 UI             |
| features | 사용자 행동 흐름              | 인증/좋아요/댓글 등 시나리오 UI/상태/서비스            | 엔티티 모델, 공용 컴포넌트                 |
| entities | 도메인 모델과 UI              | 엔티티 타입/모델, 엔티티 UI, 엔티티 API 어댑터         | 여러 엔티티 묶는 시나리오                  |
| shared   | 전역 공용 영역                | 공용 UI, 훅/유틸, 타입, API 기본 클라이언트            | 도메인 종속 UI/로직                        |

## 빠른 판단 체크리스트

| 질문                              | 배치     |
| --------------------------------- | -------- |
| 라우트 단위 화면인가?             | pages    |
| 여러 페이지에서 같은 큰 섹션인가? | widgets  |
| 사용자 행동 흐름이 핵심인가?      | features |
| 도메인 데이터가 핵심인가?         | entities |
| 어디서나 쓰는 공용 요소인가?      | shared   |

## 구성 규칙

- 상위 레이어는 하위 레이어만 참조합니다.
- 공유 가능한 코드는 가능한 한 shared로 끌어내립니다.
- 페이지는 데이터 흐름을 조립하고, 비즈니스 로직은 features/entities에 둡니다.

## 현재 폴더 구조

```text
src/
├── app/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── routes.tsx
│   ├── layouts/
│   │   └── RootLayout.tsx
│   └── providers/
│       └── .gitkeep
├── entities/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── signin.ts
│   │   │   └── signup.ts
│   │   ├── hooks/
│   │   │   ├── useSignIn.ts
│   │   │   └── useSignUp.ts
│   │   └── lib/
│   │       └── token.ts
│   ├── chat/
│   │   └── .gitkeep
│   ├── post/
│   │   └── .gitkeep
│   └── user/
│       ├── api.ts
│       ├── types.ts
│       └── hooks/
│           └── useProfile.ts
├── features/
│   ├── add-comment/
│   │   └── .gitkeep
│   └── auth/
│       ├── hooks/
│       │   └── useSignInForm.ts
│       ├── login/
│       │   └── ui/
│       │       └── .gitkeep
│       └── ui/
│           ├── ProfileImageUploader.tsx
│           ├── RequireAuth.tsx
│           ├── RequireGuest.tsx
│           ├── SignInForm.tsx
│           ├── SignUpEmailForm.tsx
│           └── SignUpProfileForm.tsx
├── lib/
│   └── utils.ts
├── pages/
│   ├── chat/
│   │   └── index.tsx
│   ├── chat-room/
│   │   └── index.tsx
│   ├── create-product/
│   │   └── index.tsx
│   ├── edit-profile/
│   │   └── index.tsx
│   ├── feed/
│   │   └── index.tsx
│   ├── home/
│   │   └── index.tsx
│   ├── not-found/
│   │   └── index.tsx
│   ├── post/
│   │   └── index.tsx
│   ├── post-create/
│   │   └── index.tsx
│   ├── profile/
│   │   └── index.tsx
│   ├── search/
│   │   └── index.tsx
│   ├── signin/
│   │   └── index.tsx
│   ├── signup/
│   │   └── index.tsx
│   └── signup-profile/
│       └── index.tsx
├── shared/
│   ├── api/
│   │   └── axios.ts
│   ├── assets/
│   │   ├── icons/
│   │   │   └── (svg)
│   │   ├── images/
│   │   │   ├── full-logo.png
│   │   │   └── logo.png
│   │   └── svg-props/
│   │       └── svg-props.tsx
│   ├── config/
│   │   └── .gitkeep
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useImageUpload.ts
│   ├── lib/
│   │   ├── .gitkeep
│   │   └── utils.ts
│   ├── types/
│   │   └── .gitkeep
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── label.tsx
├── widgets/
│   ├── tab-menu/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── Tab-menu.tsx
│   ├── top-basic-nav/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── TopBasicNav.tsx
│   ├── top-chat-nav/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── top-chat-nav.tsx
│   ├── top-main-nav/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── top-main-nav.tsx
│   ├── top-search-nav/
│   │   ├── index.ts
│   │   └── ui/
│   │       └── top-search-nav.tsx
│   └── top-upload-nav/
│       ├── index.ts
│       └── ui/
│           └── top-upload-nav.tsx
└── vite-env.d.ts
```

## 현재 페이지

| 라우트                | 설명                         |
| --------------------- | ---------------------------- |
| /                     | 홈(게스트 전용, index)       |
| /signin               | 로그인(게스트 전용)          |
| /signup               | 회원가입(게스트 전용)        |
| /signup/profile       | 회원가입 프로필 설정(게스트) |
| /feed                 | 피드(회원)                   |
| /search               | 검색(회원)                   |
| /profile              | 내 프로필(회원)              |
| /profile/:accountname | 사용자 프로필(회원)          |
| /edit-profile         | 프로필 수정(회원)            |
| /create-product       | 상품 생성(회원)              |
| /post-create          | 게시물 생성(회원)            |
| /post/:postId         | 게시글 상세(회원)            |
| /chat                 | 채팅 목록(회원)              |
| /chat/:roomId         | 채팅방(회원)                 |
| \*                    | Not Found(404)               |
