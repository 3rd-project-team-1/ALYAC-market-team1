# CLAUDE.md

## 프로젝트 기준 문서

- FSD 아키텍처 단일 소스: `FSDguide.md`
- 협업/브랜치/커밋/PR 규칙: `TEAM_CONVENTIONS.md`

이 파일은 **현재 프로젝트에서 작업할 때 빠르게 확인하는 요약 가이드**입니다.

## FSD 핵심 원칙

- 의존성은 상위 레이어에서 하위 레이어로만 향합니다.
- `pages`는 라우트 화면 조립만 담당하고, 비즈니스 로직은 `features`/`entities`에 둡니다.
- 두 곳 이상에서 재사용되는 코드는 `shared`(또는 성격상 `widgets`)로 이동합니다.
- 도메인 의존 코드(예: user/post/product)는 `shared`에 두지 않습니다.

## 현재 레이어 책임(이 프로젝트 기준)

- `app`: 엔트리, 라우팅, 전역 레이아웃/스타일/프로바이더
- `pages`: 라우트 단위 화면 조립
- `widgets`: 상단 네비/탭 메뉴 등 페이지 간 재사용되는 큰 UI 블록
- `features`: 로그인/회원가입 등 사용자 행동 시나리오
- `entities`: auth/user/post/product 등 도메인 타입·API·엔티티 UI
- `shared`: 공용 UI, 훅, 유틸, 타입, API 클라이언트

## 현재 구조 체크포인트

- 실제 디렉터리 기준 루트는 `src/app`, `src/pages`, `src/widgets`, `src/features`, `src/entities`, `src/shared` 입니다.
- `comment`, `profile-input` 관련 구조는 향후 이동 예정(상세는 `FSDguide.md` 메모 참고).
- `home/ui`는 현재 예외로 유지합니다.

## 작업 규칙(요약)

- 포맷: `npm run format`
- 린트: `npm run lint`
- 타입체크: `npm run type-check`
- 커밋 메시지: Conventional Commits (`feat`, `fix`, `refactor`, `docs` 등)

## 참고

- 레이어 배치가 애매하면 `FSDguide.md`의 “빠른 판단 체크리스트”를 우선 적용합니다.
