# 프로젝트 진행중 FSD 정리법

이 프로젝트는 Feature-Sliced Design(FSD) 구조를 기반으로 구성되었습니다. 레이어별 책임을 분리해 확장성과 유지보수성을 높입니다.

## 레이어 한눈에

| 레이어 | 역할 | 넣는 것 | 넣지 않는 것 |
| --- | --- | --- | --- |
| app | 엔트리, 라우팅, 전역 레이아웃 | `main.tsx`, `routes.tsx`, 전역 스타일, 최상단 레이아웃 | 도메인 로직, 화면 전용 상태, API 호출 로직 |
| pages | 라우트 단위 화면 조립 | 페이지 전용 컨테이너, 페이지 수준 데이터 조립 | 재사용 UI 조각(가능하면 widgets/shared) |
| widgets | 페이지 간 재사용 섹션 | 여러 피처/엔티티 합친 큰 UI 블록 | 단일 도메인 로직, 단일 행동 UI |
| features | 사용자 행동 흐름 | 인증/좋아요/댓글 등 시나리오 UI/상태/서비스 | 엔티티 모델, 공용 컴포넌트 |
| entities | 도메인 모델과 UI | 엔티티 타입/모델, 엔티티 UI, 엔티티 API 어댑터 | 여러 엔티티 묶는 시나리오 |
| shared | 전역 공용 영역 | 공용 UI, 훅/유틸, 타입, API 기본 클라이언트 | 도메인 종속 UI/로직 |

## 빠른 판단 체크리스트

| 질문 | 배치 |
| --- | --- |
| 라우트 단위 화면인가? | pages |
| 여러 페이지에서 같은 큰 섹션인가? | widgets |
| 사용자 행동 흐름이 핵심인가? | features |
| 도메인 데이터가 핵심인가? | entities |
| 어디서나 쓰는 공용 요소인가? | shared |

## 구성 규칙

- 상위 레이어는 하위 레이어만 참조합니다.
- 공유 가능한 코드는 가능한 한 shared로 끌어내립니다.
- 페이지는 데이터 흐름을 조립하고, 비즈니스 로직은 features/entities에 둡니다.

## 현재 폴더 구조

```
src/
  app/
    App.tsx
    index.css
    main.tsx
    routes.tsx
    layouts/
      RootLayout.tsx
    providers/
  pages/
    feed/
      index.tsx
    home/
      index.tsx
    post/
      index.tsx
    profile/
      index.tsx
    signin/
      index.tsx
  widgets/
  features/
    auth/
      ui/
        RequireGuest.tsx
  entities/
  shared/
    api/
    config/
    hooks/
    lib/
    types/
    ui/
```

## 현재 페이지

| 라우트 | 설명 |
| --- | --- |
| home | 홈 |
| feed | 피드 |
| post | 게시글 상세 |
| profile | 프로필 |
| signin | 로그인 |
