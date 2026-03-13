import { useEffect, useReducer } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getFeedPosts } from '@/entities/post/api/getFeedPosts';
import { postQueryKeys } from '@/entities/post/model/queryKeys';

import { mapPost } from '../model/mapPost';
import type { PostCardModel } from '../model/types';

/** 게시글 하나를 불러온 후 다음 게시글까지 대기 시간 (ms) */
const SLOW_LOAD_DELAY_MS = 250;

// ─── 상태 타입 ────────────────────────────────────────────────────────────────

type State = {
  posts: PostCardModel[];
  isFetching: boolean;
  isDone: boolean;
};

/** 폴백 로딩 상태를 변경하는 액션 유니온 타입 */
type Action =
  | { type: 'RESET' } // 폴백 세션 초기화
  | { type: 'FETCH_START' } // 게시글 요청 시작
  | { type: 'FETCH_SUCCESS'; post: PostCardModel } // 게시글 수신 성공
  | { type: 'DONE' }; // 모든 게시글 소진 또는 오류 종료

const initialState: State = { posts: [], isFetching: false, isDone: false };

// ─── 헬퍼 ─────────────────────────────────────────────────────────────────────

/**
 * AbortSignal을 지원하는 지연 함수입니다.
 * signal이 abort되면 Promise가 reject되어 대기 중인 sleep을 즉시 종료합니다.
 */
function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const id = setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
        reject(new DOMException('Aborted', 'AbortError'));
      },
      { once: true },
    );
  });
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET':
      // isEnabled가 true로 다시 활성화될 때 상태를 완전히 초기화
      return initialState;
    case 'FETCH_START':
      return { ...state, isFetching: true };
    case 'FETCH_SUCCESS': {
      // 동일 id가 이미 목록에 있으면 추가하지 않음 (중복 방지)
      const isDuplicate = state.posts.some((p) => p.id === action.post.id);
      return {
        ...state,
        isFetching: false,
        posts: isDuplicate ? state.posts : [...state.posts, action.post],
      };
    }
    case 'DONE':
      // 더 불러올 게시글이 없거나 오류 발생 시 로딩을 종료
      return { ...state, isFetching: false, isDone: true };
  }
}

/**
 * 피드 로딩 실패 시 게시글을 1개씩 천천히 불러오는 폴백 훅입니다.
 *
 * `isEnabled`가 true로 바뀌면 자동으로 게시글을 하나씩 순차적으로 요청하며,
 * 각 요청 사이에 `SLOW_LOAD_DELAY_MS` 만큼 대기합니다.
 *
 * @param isEnabled - true이면 폴백 로딩 시작 (일반적으로 isError가 true일 때 전달)
 * @param initialSkip - 기존에 정상 로딩된 게시글 개수(폴백 시작 오프셋)
 *
 * @returns
 * - `posts`      - 폴백으로 추가로 불러온 게시글 목록
 * - `isFetching` - 현재 다음 게시글을 불러오는 중인지 여부
 * - `isDone`     - 더 이상 불러올 게시글이 없거나 오류가 발생해 종료된 경우 true
 */
export function useSlowFeedFallback(isEnabled: boolean, initialSkip = 0) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!isEnabled) return;

    // AbortController로 비동기 페치·sleep 취소를 한 곳에서 관리
    const controller = new AbortController();
    const { signal } = controller;

    // skip은 기존 정상 피드 이후 지점부터 시작해 이어서 불러옵니다.
    let skip = initialSkip;

    dispatch({ type: 'RESET' });

    const fetchOne = async () => {
      if (signal.aborted) return;

      dispatch({ type: 'FETCH_START' });

      try {
        const { posts = [] } = await queryClient.fetchQuery({
          queryKey: [...postQueryKeys.feed(), 'fallback', skip, 1],
          queryFn: () => getFeedPosts(skip, 1),
          staleTime: 1000 * 60 * 5,
        });

        // 비동기 응답이 돌아왔을 때 이미 중단 상태이면 무시
        if (signal.aborted) return;

        if (posts.length === 0) {
          // 더 불러올 게시글 없음 → 폴백 종료
          dispatch({ type: 'DONE' });
          return;
        }

        dispatch({ type: 'FETCH_SUCCESS', post: { ...mapPost(posts[0]), isfollow: true } });
        skip += 1;

        // SLOW_LOAD_DELAY_MS 대기 후 다음 게시글 요청 (abort 시 즉시 중단)
        await sleep(SLOW_LOAD_DELAY_MS, signal);
        fetchOne();
      } catch {
        // AbortError 또는 네트워크 오류 — abort된 경우 DONE 미발행
        if (!signal.aborted) {
          dispatch({ type: 'DONE' });
        }
      }
    };

    fetchOne();

    return () => {
      // 언마운트 또는 isEnabled 변경 시 진행 중인 페치·타이머 일괄 취소
      controller.abort();
    };
  }, [initialSkip, isEnabled, queryClient]);

  return state;
}
