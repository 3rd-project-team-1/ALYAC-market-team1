# Alyac Market

## 목차

- [1. 프로젝트 개요](#1-프로젝트-개요)
- [1.1 목표](#11-목표)
- [1.2 팀원](#12-팀원)
- [1.3 마일스톤](#13-마일스톤)
- [1.4 주요 기능](#14-주요-기능)
- [2. 개발 환경 및 배포](#2-개발-환경-및-배포)
- [2.1 개발 스택](#21-개발-스택)
- [2.2 배포 URL](#22-배포-url)
- [3. 라우팅 구조](#3-라우팅-구조)
- [3.1 비인증 페이지 (RequireGuest)](#31-비인증-페이지-requireguest)
- [3.2 인증 필요 페이지 (RequireAuth)](#32-인증-필요-페이지-requireauth)
- [4. 데이터 흐름](#4-데이터-흐름)
- [4.1 주요 API 엔드포인트](#41-주요-api-엔드포인트)
- [5. 프로젝트 구조](#5-프로젝트-구조)
- [5.1 레이어별 도메인](#51-레이어별-도메인)
- [6. 아키텍처](#6-아키텍처)
- [7. 실행 방법](#7-실행-방법)
- [8. 테스트 계정](#8-테스트-계정)

## 1. 프로젝트 개요

이스트소프트 프론트엔드 개발과정 10기
3차 프로젝트 : SNS 오픈마켓 개발

### 1.1 목표

- 모바일 친화적인 SNS 오픈마켓 웹 애플리케이션 개발
- 사용자 간 상품 거래 및 소통 지원

### 1.2 팀원

- 팀장: 김동희
- 팀원: 김세윤, 배준우, 장영재

### 1.3 마일스톤

```mermaid
%%{init: { 'theme': 'base', 'themeVariables': {
  'primaryColor': '#6366f1',
  'primaryTextColor': '#ffffff',
  'primaryBorderColor': '#4338ca',
  'secondaryColor': '#c7d2fe',
  'tertiaryColor': '#e0e7ff',
  'sectionBkgColor': '#e0e7ff',
  'altSectionBkgColor': '#f5f3ff',
  'doneTaskBkgColor': '#6366f1',
  'doneTaskBorderColor': '#4338ca',
  'activeTaskBkgColor': '#fb923c',
  'activeTaskBorderColor': '#ea580c',
  'gridColor': '#c7d2fe',
  'taskTextColor': '#ffffff',
  'taskTextDarkColor': '#1e1b4b',
  'taskTextOutsideColor': '#1e1b4b',
  'labelColor': '#312e81',
  'todayLineColor': '#ec4899'
} } }%%
gantt
    title Alyac Market 개발 현황 (커밋 기반)
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

  section 단계별 요약
  기획 · 환경 세팅                      :done, m1, 2026-02-13, 2026-02-23
  인증 · 검증 기능 구축                 :done, m2, 2026-02-14, 2026-03-04
  프로필 · 팔로우 기능 구현             :done, m3, 2026-02-19, 2026-03-05
  피드 · 게시글 기능 완성               :done, m4, 2026-02-19, 2026-03-04
  상품 · 검색 기능 구현                 :done, m5, 2026-02-24, 2026-02-25
  UI 공통화 · 컴포넌트 정리             :done, m6, 2026-02-20, 2026-03-04
  FSD 리팩토링 · 문서화 자동화          :done, m7, 2026-02-25, 2026-03-05
```

<details>
<summary>Day 1 ~ Day 18 상세 기록 보기</summary>


#### Day 1 — 프로젝트 기획 및 역할 분담 (2026-02-13)

| 팀원          | 담당 파트                  |
| ------------- | -------------------------- |
| 김동희 (팀장) | 피드 페이지, 검색 페이지   |
| 김세윤        | 프로필 파트                |
| 배준우        | 로그인 파트                |
| 장영재        | 공통 컴포넌트(shared) 파트 |

- FSD(Feature-Sliced Design) 폴더 구조 규칙 확립
- 컴포넌트 작성 및 코드 컨벤션 합의

---

#### Day 2 — 기능별 초기 구현 시작 (2026-02-19)

- 피드 페이지·검색 페이지 초기 구현
- 프로필 페이지 구현 시작
- `Auth` / `User` 타입 정의 및 `token.ts` 작성
- 버튼 SVG 에셋 추가 및 `shared/ui/button` 컴포넌트 구현

---

#### Day 3 — 회원가입·프로필·라우팅·환경 설정 (2026-02-20)

- **회원가입 및 프로필 기능 구현**: 회원가입(SignUp) 페이지와 프로필 관련 API 호출 로직 작성, 유효성 검사 추가
- **컴포넌트 리팩터링 및 UI 고도화**: 버튼을 CVA 기반으로 전환, SVG 컴포넌트화, 커스텀 훅(`useProfile`, `useImageUpload`) 분리
- **라우팅 및 네비게이션 최적화**: 라우터를 동적 로딩(Lazy Loading) 방식으로 변경, 페이지 경로 통일 및 그룹화
- **개발 환경 설정 보완**: Vite 프록시 설정으로 DB 통신 확인, 토큰 갱신 에러 처리 및 테마 설정 추가
- **코드 정리 및 충돌 해결**: `develop` 브랜치 병합 충돌 해결, 불필요한 주석 및 파일명 정리

---

#### Day 4 — 네비게이션 구조 및 공통 UI 정의 (2026-02-23)

- 로그인 후 메인 Nav의 "설정 및 개인정보" 항목을 Modal로 구현, 클릭 시 프로필 수정 페이지로 이동
- 팔로워 페이지 전용 팔로우 Nav 컴포넌트를 팔로우 페이지 내에 작성
- 프로필 저장 버튼·게시글 업로드 버튼을 `shared` 폴더에 공통 컴포넌트로 분리하여 각 페이지에 적용
- 페이지별 헤더 관리 방식 논의 (버튼 헤더의 API 연결 및 버튼 명칭 문제 포함)
- Prettier 공유 설정 누락 문제 해결

---

#### Day 5 — FSD 구조 정비 및 데이터 페칭 리팩토링 (2026-02-24)

- FSD 계층 구조(`app → pages → widgets → features → entities → shared`) 전면 재점검 및 정리
- `useEffect` 기반 수동 API 호출 방식을 `useQuery`(React Query) 방식으로 일괄 리팩토링
- 프로젝트 내 가이드 파일(`FSDguide.md`) 기준으로 레이어 위반 사항 수정

---

#### Day 6 — 검색 뼈대 구현 및 환경 이슈 해결 (2026-02-25)

- 검색 기능 UI·라우팅 뼈대 구현 (로직 미완성)
- SVG 아이콘 전면 교체 작업 진행 중
- FSD 폴더 구조 리팩토링 진행 중
- `npm run format` 자동화가 동작하지 않는 문제 발견 → Prettier 팀 동기화 완료

---

#### Day 7 — 검색 기능 완성 및 피드 연동 (2026-02-26)

- 검색 기능 완료: 팔로잉한 사용자의 게시글·상품이 피드에 노출되도록 구현
- `feed` 페이지·`search` 페이지 FSD 리팩토링 거의 완료

---

#### Day 8 — 피드 페이지 UI 개선 (2026-02-27)

- 피드 페이지 전체 UI 수정 완료
- `feed` 페이지·`search` 페이지 FSD 리팩토링 마무리 단계

---

#### Day 9 — 무한 스크롤 및 포스트 UI 고도화 (2026-03-03)

- 피드 페이지 무한 스크롤(`useInfiniteQuery`) 구현
- 포스트 페이지 UI 개선: 푸터, 이미지 미리보기, 모달 추가
- 토큰 검증 로직 추가 및 `QueryClient` 전역 설정 정비

---

#### Day 10 — 문서화 · 코드 정리 · 기능 마무리 (2026-03-04)

- **문서화**: README 전면 업데이트 — 개발 스택 버전 표, 라우팅 구조 표, API 엔드포인트 목록, 아키텍처 Flowchart, 마일스톤 gantt 실제 날짜 적용
- **유틸 · 검증 도입**: `cn` 유틸 함수 추가, `zod` 스키마 검증 전면 도입
- **기능 구현**: 좋아요(heart) 기능 임시 구현
- **코드 정리**: 레거시 코드 제거, 임포트 경로 통일
- **구조 정비**: FSD 계층 기준 위반 항목 최종 재정비

---

#### Day 11 — API 스키마 확장 · UI 일관화 (2026-03-05)

- auth/user/post 스키마 검증을 확장하고 500 오류 원인을 수정
- API URL 하드코딩을 제거하고 `endpoints.ts` 상수 기반으로 통일
- Post 상세/댓글의 MoreMenu 전환 등 UI 일관성 개선

---

#### Day 12 — FSD 분리 고도화 · 도메인 기능 보강 (2026-03-06)

- post/product/profile 로직을 features/entities로 재분리해 pages 경량화
- product 편집/삭제 API 연동, profile 그리드/리스트 뷰 및 이동 UX 개선
- post 신고/삭제 확인 모달, 댓글/이미지 편집 기능 등 상세 기능 보강
- feed 구조 리팩토링과 로딩/에러 처리 안정화 진행

---

#### Day 13 — 자동화 점검 (2026-03-07)

- 문서 자동 업데이트 워크플로우 동작 확인 및 안정성 점검

---

#### Day 14 — API 클라이언트 공통화 (2026-03-08)

- Zod 기반 타입 안전 요청 래퍼를 도입하고 API 호출 구조를 공통화
- entities(auth/user/product/post) 중복 검증 로직 제거 및 타입 정리
- JSDoc/스키마 중심 구조로 전환해 유지보수성 개선

---

#### Day 15 — 라우팅/쿼리 키 정리 · 피드 안정화 (2026-03-09)

- 라우터 가드 리팩토링(중복 제거, 로딩 스피너 추가, 구조 정리)
- 하드코딩 경로/쿼리 키를 상수로 치환해 참조 안정성 강화
- 피드 무한스크롤/캐시 업데이트 및 로딩 처리 개선

---

#### Day 16 — 배포 대응 보정 · 캐시 동기화 강화 (2026-03-10)

- 개발/배포 응답 차이를 반영한 스키마 보정(optional/nullish 처리)
- Firebase 환경 변수화 및 피드 로딩 실패 폴백/타임아웃 조정
- 좋아요·댓글·팔로우 후 프로필/피드 수치 즉시 반영되도록 쿼리 무효화 강화

---

#### Day 17 — 프로필/댓글 UX 개선 · 공통 헤더화 (2026-03-11)

- 프로필 게시물·댓글 무한 스크롤과 신고 모달/권한 토스트 등 상호작용 개선
- 팔로워/팔로잉 isfollow 교정, 로그아웃 시 React Query 캐시 초기화 추가
- `TopHeaderLayout` 공통화와 이미지 업로드 훅 정리로 UI 중복 축소

---

#### Day 18 — 피드 UI 완성도 향상 · 요청 파라미터 튜닝 (2026-03-12)

- PostCard/캐러셀/이미지 카운트/상대 시간/아바타 팝오버 등 피드 UI 고도화
- `useFeedPostsQuery`의 LIMIT, `staleTime`, timeout 조정으로 체감 성능 개선
- 검색 스키마 null 허용, 팔로우 폴백 보정, 에러 배너 분리 등 안정화 작업

</details>

### 1.4 주요 기능

| 기능   | 설명                                          |
| ------ | --------------------------------------------- |
| 인증   | 회원가입 · 로그인 · 로그아웃 · 토큰 자동 갱신 |
| 프로필 | 프로필 조회 · 수정 · 팔로우 / 언팔로우        |
| 팔로우 | 팔로워 / 팔로잉 목록 조회                     |
| 피드   | 팔로잉 사용자 게시글 무한 스크롤              |
| 게시글 | 작성 · 수정 · 삭제 · 이미지 첨부 (최대 3장)   |
| 좋아요 | 게시글 좋아요 / 취소                          |
| 댓글   | 댓글 작성 · 목록 · 삭제 · 신고                |
| 상품   | 상품 등록 · 수정 · 삭제 · 목록 조회           |
| 검색   | 계정명 기반 사용자 검색                       |
| 채팅   | 채팅 목록 · 채팅방 (UI 구현)                  |

## 2. 개발 환경 및 배포

### 2.1 개발 스택

| 분류        | 기술                         | 버전  |
| ----------- | ---------------------------- | ----- |
| 프레임워크  | React                        | 19.2  |
| 언어        | TypeScript                   | 5.9   |
| 빌드        | Vite                         | 7.3   |
| 라우팅      | React Router DOM             | 7.13  |
| 서버 상태   | TanStack Query (React Query) | 5.90  |
| 전역 상태   | Zustand                      | 5.0   |
| HTTP        | Axios                        | 1.13  |
| 폼 / 검증   | React Hook Form + Zod        | 7 / 4 |
| 스타일      | Tailwind CSS v4              | 4.1   |
| UI 컴포넌트 | Radix UI · CVA · shadcn/ui   | -     |
| 토스트      | Sonner                       | 2.0   |
| 백엔드      | Node.js · Express            | -     |
| DB          | JSON Server (db.json)        | -     |

### 2.2 배포 URL

- 프론트엔드: []()
- 백엔드: []()

## 3. 라우팅 구조

### 3.1 비인증 페이지 (RequireGuest)

| 경로              | 페이지                      |
| ----------------- | --------------------------- |
| `/`               | 홈 (스플래시 · 서비스 소개) |
| `/signin`         | 로그인                      |
| `/signup`         | 회원가입                    |
| `/signup/profile` | 회원가입 — 프로필 설정      |

### 3.2 인증 필요 페이지 (RequireAuth)

| 경로                       | 페이지                    |
| -------------------------- | ------------------------- |
| `/feed`                    | 팔로잉 피드               |
| `/search`                  | 사용자 검색               |
| `/profile`                 | 내 프로필                 |
| `/profile/:accountname`    | 타 사용자 프로필          |
| `/edit-profile`            | 프로필 수정               |
| `/create-product`          | 상품 등록                 |
| `/edit-product/:productId` | 상품 수정                 |
| `/create-post`             | 게시글 작성               |
| `/post/:postId`            | 게시글 상세 (댓글·좋아요) |
| `/post/:postId/edit`       | 게시글 수정               |
| `/chat`                    | 채팅 목록                 |
| `/chat/:roomId`            | 채팅방                    |
| `/followers/:accountname`  | 팔로워 목록               |
| `/followings/:accountname` | 팔로잉 목록               |
| `*`                        | 404 Not Found             |

## 4. 데이터 흐름

1. 클라이언트는 Axios를 통해 `/api/*` 경로로 REST API 요청을 보냅니다. (Vite 프록시 → `http://localhost:3000`)
2. 서버 상태는 **TanStack Query**가 캐싱·동기화하고, 전역 UI 상태는 **Zustand**로 관리합니다.
3. 인증 토큰(accessToken · refreshToken)은 **LocalStorage**에 저장되며, Axios 인터셉터가 요청마다 자동 첨부합니다.
4. 토큰 만료 시 `/api/user/refresh` 로 자동 재발급 후 원래 요청을 재시도합니다.

### 4.1 주요 API 엔드포인트

| 분류   | 메서드 | 경로                                      | 설명                           |
| ------ | ------ | ----------------------------------------- | ------------------------------ |
| 인증   | POST   | `/api/user`                               | 회원가입                       |
| 인증   | POST   | `/api/user/signin`                        | 로그인                         |
| 인증   | POST   | `/api/user/refresh`                       | 토큰 재발급                    |
| 인증   | GET    | `/api/user/checktoken`                    | 토큰 유효성 검사               |
| 인증   | POST   | `/api/user/emailvalid`                    | 이메일 중복 확인               |
| 인증   | POST   | `/api/user/accountnamevalid`              | 계정명 중복 확인               |
| 사용자 | GET    | `/api/user/myinfo`                        | 내 정보 조회                   |
| 사용자 | PUT    | `/api/user`                               | 프로필 수정                    |
| 사용자 | GET    | `/api/user/searchuser`                    | 사용자 검색                    |
| 프로필 | GET    | `/api/profile/:accountname`               | 프로필 조회                    |
| 프로필 | POST   | `/api/profile/:accountname/follow`        | 팔로우                         |
| 프로필 | DELETE | `/api/profile/:accountname/unfollow`      | 언팔로우                       |
| 프로필 | GET    | `/api/profile/:accountname/following`     | 팔로잉 목록                    |
| 프로필 | GET    | `/api/profile/:accountname/follower`      | 팔로워 목록                    |
| 게시글 | POST   | `/api/post`                               | 게시글 작성                    |
| 게시글 | GET    | `/api/post/feed`                          | 팔로잉 피드                    |
| 게시글 | GET    | `/api/post/:accountname/userpost`         | 사용자 게시글                  |
| 게시글 | GET    | `/api/post/:post_id`                      | 게시글 상세                    |
| 게시글 | PUT    | `/api/post/:post_id`                      | 게시글 수정                    |
| 게시글 | DELETE | `/api/post/:post_id`                      | 게시글 삭제                    |
| 좋아요 | POST   | `/api/post/:post_id/heart`                | 좋아요                         |
| 좋아요 | DELETE | `/api/post/:post_id/unheart`              | 좋아요 취소                    |
| 댓글   | POST   | `/api/post/:post_id/comments`             | 댓글 작성                      |
| 댓글   | GET    | `/api/post/:post_id/comments`             | 댓글 목록                      |
| 댓글   | DELETE | `/api/post/:post_id/comments/:comment_id` | 댓글 삭제                      |
| 상품   | POST   | `/api/product`                            | 상품 등록                      |
| 상품   | GET    | `/api/product/:accountname`               | 사용자 상품 목록               |
| 상품   | GET    | `/api/product/detail/:product_id`         | 상품 상세                      |
| 상품   | PUT    | `/api/product/:product_id`                | 상품 수정                      |
| 상품   | DELETE | `/api/product/:product_id`                | 상품 삭제                      |
| 이미지 | POST   | `/api/image/uploadfile`                   | 단일 이미지 업로드             |
| 이미지 | POST   | `/api/image/uploadfiles`                  | 다중 이미지 업로드 (최대 10개) |

## 5. 프로젝트 구조

FSD(Feature-Sliced Design) 아키텍처를 적용합니다. 상위 레이어는 하위 레이어만 참조할 수 있습니다.

```
src/
  app/           # 앱 진입점 · 라우터 · QueryClient · 전역 Provider
  pages/         # 라우트별 페이지 조립 (18개 페이지)
  widgets/       # 독립적 UI 블록 (TopNav 6종, TabMenu)
  features/      # 사용자 시나리오 단위 (auth, feed, post, product, profile, chat, search, home, create-post)
  entities/      # 도메인 모델 · API · 훅 (auth, feed, post, product, user)
  shared/        # 도메인 무관 공용 기반 (axiosInstance, ui/, hooks/, lib/)
```

### 5.1 레이어별 도메인

| 레이어           | 포함 도메인 / 모듈                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **entities**     | `auth` · `feed` · `post` · `product` · `user`                                                        |
| **features**     | `auth` · `chat` · `create-post` · `feed` · `home` · `post` · `product` · `profile` · `search`        |
| **widgets**      | `top-basic-nav` · `top-chat-nav` · `top-main-nav` · `top-search-nav` · `top-upload-nav` · `tab-menu` |
| **shared/ui**    | `button` · `feedback` · `form` · `modal` · `user`                                                    |
| **shared/hooks** | `useDebounce` · `useImageUpload`                                                                     |
| **shared/lib**   | `cn` · `getImageUrl` · token 관리 · theme                                                            |

## 6. 아키텍처

- FSD(Feature-Sliced Design) 계층 구조 적용 (`app → pages → widgets → features → entities → shared`)
- 클라이언트-서버 분리, Axios 기반 REST API 통신 (Vite 프록시)
- 상태 관리: 전역 UI(Zustand) + 서버 상태·캐싱(TanStack Query)
- 폼 유효성: React Hook Form + Zod 스키마 검증

```mermaid
flowchart TD
    User([👤 사용자])

    subgraph Client["클라이언트 (React 19 + Vite 7)"]
        direction TB

        subgraph FSD["FSD 레이어"]
            direction TB
            Pages["Pages\n18개 라우트 페이지"]
            Widgets["Widgets\nTopNav 6종 · TabMenu"]
            Features["Features\nauth · feed · post · product\nprofile · chat · search · home"]
            Entities["Entities\nauth · feed · post · product · user\n(API 함수 · 타입 · 쿼리 훅)"]
            Shared["Shared\naxios · ui/ · hooks/ · lib/"]

            Pages --> Widgets --> Features --> Entities --> Shared
        end

        subgraph State["상태 관리"]
            Zustand["Zustand\n전역 UI 상태\n(auth, modal 등)"]
            ReactQuery["TanStack Query\n서버 상태 · 캐싱\n무한 스크롤"]
        end

        subgraph Form["폼 · 검증"]
            RHF["React Hook Form"]
            Zod["Zod 스키마"]
            RHF --> Zod
        end

        Features <--> State
        Entities <--> ReactQuery
        Features <--> Form
    end

    subgraph Server["백엔드 (Node.js + Express)"]
        direction TB
        AuthAPI["인증 API\n/api/user/*"]
        PostAPI["게시글 API\n/api/post/*"]
        ProductAPI["상품 API\n/api/product/*"]
        ProfileAPI["프로필 API\n/api/profile/*"]
        ImageAPI["이미지 API\n/api/image/*"]
        DB[("db.json\nusers · posts · comments\nhearts · products · reports")]

        AuthAPI & PostAPI & ProductAPI & ProfileAPI & ImageAPI --> DB
    end

    User -->|"페이지 요청"| Pages
    ReactQuery <-->|"HTTP (Axios)\nVite Proxy /api"| AuthAPI
    ReactQuery <-->|"HTTP (Axios)"| PostAPI
    ReactQuery <-->|"HTTP (Axios)"| ProductAPI
    ReactQuery <-->|"HTTP (Axios)"| ProfileAPI
    Shared <-->|"이미지 업로드"| ImageAPI
    Zustand -->|"accessToken · refreshToken"| LocalStorage[(LocalStorage)]
```

## 7. 실행 방법

1. 백엔드 서버 실행

alyac-market-server-main

```bash
npm install
npm run start
```

2. 프론트엔드 서버 실행

3rd-project

```bash
cd 3rd-project
npm install
npm run dev
```

## 8. 테스트 계정

- 아이디: test@test.com / 비밀번호: 11111111
