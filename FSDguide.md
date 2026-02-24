# 프로젝트 진행중 FSD 정리법

이 프로젝트는 Feature-Sliced Design(FSD) 구조를 기반으로 구성되었습니다. 레이어별 책임을 분리해 확장성과 유지보수성을 높입니다.

## 레이어 한눈에

| 레이어   | 핵심 책임               | 포함 예시                                        | 제외 예시                            |
| -------- | ----------------------- | ------------------------------------------------ | ------------------------------------ |
| app      | 앱 진입점과 전역 설정   | 엔트리, 라우팅, 전역 스타일, 레이아웃/프로바이더 | 도메인 로직, 화면 전용 상태          |
| pages    | 라우트 화면 조립        | 페이지 컨테이너, 섹션 조합                       | 재사용 가능한 공용 섹션/컴포넌트     |
| widgets  | 페이지 간 재사용 섹션   | 상단 네비, 탭 메뉴 같은 큰 UI 블록               | 단일 도메인 액션 로직                |
| features | 사용자 행동 시나리오    | 로그인, 댓글 작성, 팔로우 흐름                   | 엔티티 모델 자체, 전역 공용 컴포넌트 |
| entities | 도메인 모델과 도메인 UI | user/post/product 타입, API, 엔티티 UI           | 여러 도메인을 묶는 시나리오          |
| shared   | 도메인 무관 공용 기반   | 공용 UI, 훅, 유틸, 타입, 기본 API 클라이언트     | 도메인 의존 UI/비즈니스 로직         |

## 빠른 판단 체크리스트

아래 질문을 위에서 아래 순서대로 확인하면 대부분 바로 결정됩니다.

| 순서 | 질문                                      | 배치     | 판단 기준(짧게)                            |
| ---- | ----------------------------------------- | -------- | ------------------------------------------ |
| 1    | 앱 엔트리/라우팅/전역 레이아웃 코드인가?  | app      | 앱 시작점, 라우터, 전역 스타일/프로바이더  |
| 2    | 라우트 1개를 조립하는 화면 코드인가?      | pages    | 페이지 단위 컨테이너, 섹션 조합            |
| 3    | 여러 페이지에서 재사용되는 큰 섹션인가?   | widgets  | 상단 네비, 탭 메뉴처럼 페이지 간 공통 블록 |
| 4    | 사용자 행동(시나리오) 중심 코드인가?      | features | 로그인, 댓글 작성, 팔로우 같은 액션 흐름   |
| 5    | 특정 도메인 모델/타입/API/UI 코드인가?    | entities | user/post/product 등 도메인 중심 코드      |
| 6    | 도메인에 무관하게 어디서나 쓰는 코드인가? | shared   | 공용 UI, 유틸, 훅, 타입, API 클라이언트    |

- 경계가 애매하면 `features → entities → shared` 순서로 더 낮은 책임으로 분리할 수 있는지 먼저 확인합니다.

## 구성 규칙

- 의존성은 상위가 하위를 부르는 단방향 import를 유지.
- `pages`는 조립 전용으로 사용하고, 비즈니스 로직은 `features`/`entities`에 둡니다.
- 두 곳 이상에서 재사용되면 `shared`(또는 필요 시 `widgets`)로 이동합니다.
- 도메인에 종속된 코드를 `shared`에 두지 않습니다.

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
│   │   ├── api.ts
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── ui/
│   │       └── PostCard.tsx
│   ├── product/
│   │   ├── api.ts
│   │   └── types.ts
│   └── user/
│       ├── api.ts
│       ├── types.ts
│       ├── ui/
│       │   └── UserSearchItem.tsx
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
│   │   ├── index.tsx
│   │   └── ui/
│   │       └── SocialLoginButtons.tsx
│   ├── not-found/
│   │   └── index.tsx
│   ├── post/
│   │   ├── index.tsx
│   │   └── comment/
│   │       └── comment.tsx
│   ├── post-create/
│   │   └── index.tsx
│   ├── profile/
│   │   ├── index.tsx
│   │   └── profile-input/
│   │       ├── followButton.tsx
│   │       └── followItem.tsx
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
│   │   │   └── *.svg
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
│       ├── FormField.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── userAvatar.tsx
│       └── userInfo.tsx
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

## 구조적 이슈 및 개선 사항

현재 폴더 구조에서 FSD 원칙과 맞지 않는 부분들입니다. 아래 항목들을 체계적으로 정리해야 합니다.

| #   | 이슈                        | 현재 위치                              | 이동 대상                                | 이유                                                |
| --- | --------------------------- | -------------------------------------- | ---------------------------------------- | --------------------------------------------------- |
| 1   | `lib` 폴더 중복             | `src/lib/utils.ts`                     | 제거 (이미 `shared/lib/utils.ts`에 존재) | FSD는 `lib`을 레이어 내에만 둠. 최상위 `lib` 불필요 |
| 2   | 소셜 로그인 버튼            | `pages/home/ui/SocialLoginButtons.tsx` | `widgets/` 또는 `entities/auth/ui/`      | 홈 페이지 전용이 아니라 재사용 가능한 컴포넌트      |
| 3   | 댓글 입력 컴포넌트          | `pages/post/comment/comment.tsx`       | `features/add-comment/ui/`               | 댓글 기능은 사용자 액션 `feature`로 분류            |
| 4   | 프로필 페이지 서브 컴포넌트 | `pages/profile/profile-input/`         | `features/` 또는 `widgets/`              | 페이지 내 UI 조각은 상위 레이어로 분리              |

## 다음 단계

위 이슈들을 차례대로 정리하면서 FSD 구조를 점진적으로 안정화합니다.

- 각 컴포넌트의 의존성 확인 후 안전하게 이동
- 모듈 경로 업데이트
- 최종 폴더 구조 문서 갱신
