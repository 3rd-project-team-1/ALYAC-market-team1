# TEAM_CONVENTIONS

## 1) Git 브랜치 전략

기본 전략은 `main` + `develop` + `feature/*` + `hotfix/*`를 사용합니다.

- `main`: 배포 가능한 안정 브랜치
- `develop`: 다음 배포를 위한 통합 브랜치
- `feature/<scope>`: 기능 개발 브랜치 (예: `feature/homepage`)
- `hotfix/<scope>`: 운영 긴급 수정 브랜치

### 작업 흐름

1. `develop`에서 `feature/*` 브랜치 생성
2. 작업 후 PR을 `develop` 대상으로 생성
3. 리뷰 승인 후 Squash Merge
4. 배포 시점에 `develop -> main` PR 생성

## 2) 코드 스타일

저장소의 ESLint/Prettier 설정을 단일 기준으로 사용합니다.

- 포맷: `npm run format`
- 포맷 확인: `npm run format:check`
- 린트: `npm run lint`
- 타입체크: `npm run type-check`

### 규칙

- TypeScript 우선, `any` 사용 최소화
- 컴포넌트/함수 이름은 의도를 드러내는 명사/동사형 사용
- FSD 레이어 의존 방향 준수
- 페이지에서 비즈니스 로직 직접 구현 금지

## 3) 커밋 메시지

Conventional Commits 형식을 사용합니다.

- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 구조 개선
- `style`: 포맷/세미콜론/공백 등 비기능 수정
- `docs`: 문서 변경
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정/의존성 작업

형식:

`<type>(<scope>): <summary>`

예시:

- `feat(auth): 로그인 폼 유효성 검증 추가`
- `fix(feed): 빈 게시글 목록 처리`
- `docs(fsd): 레이어 책임 설명 보완`

## 4) PR 규칙

- PR 크기: 가능한 작게 유지 (권장 300 LOC 이내)
- 체크리스트: `lint`, `type-check`, 로컬 실행 확인
- 리뷰 포인트를 PR 본문에 명시
- 셀프 머지 금지 (최소 1명 승인)
