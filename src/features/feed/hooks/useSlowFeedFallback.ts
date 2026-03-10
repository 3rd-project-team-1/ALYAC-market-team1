import { useEffect, useReducer, useRef } from 'react';

import { getFeedPosts } from '@/entities/post/api/getFeedPosts';
import type { Post } from '@/entities/post/model/post.schema';

import type { PostCardModel } from '../model/types';

/** 게시글 하나를 불러온 후 다음 게시글까지 대기 시간 (ms) */
const SLOW_LOAD_DELAY_MS = 800;

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

// ─── 헬퍼 ─────────────────────────────────────────────────────────────────────

/**
 * API 응답 Post를 UI 렌더링에 필요한 PostCardModel로 변환합니다.
 * 빈 문자열 이미지는 undefined로 정규화합니다.
 */
function mapPost(post: Post): PostCardModel {
  return {
    id: post.id,
    content: post.content,
    image: post.image?.trim() || undefined,
    hearted: post.hearted,
    heartCount: post.heartCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt,
    author: {
      username: post.author.username,
      accountname: post.author.accountname,
      image: post.author.image,
    },
  };
}

/**
 * 피드 로딩 실패 시 게시글을 1개씩 천천히 불러오는 폴백 훅입니다.
 *
 * `isEnabled`가 true로 바뀌면 자동으로 게시글을 하나씩 순차적으로 요청하며,
 * 각 요청 사이에 `SLOW_LOAD_DELAY_MS` 만큼 대기합니다.
 *
 * @param isEnabled - true이면 폴백 로딩 시작 (일반적으로 isError가 true일 때 전달)
 *
 * @returns
 * - `posts`      - 지금까지 불러온 게시글 목록
 * - `isFetching` - 현재 다음 게시글을 불러오는 중인지 여부
 * - `isDone`     - 더 이상 불러올 게시글이 없거나 오류가 발생해 종료된 경우 true
 */
export function useSlowFeedFallback(isEnabled: boolean) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 현재까지 건너뛴 게시글 수 (API skip 파라미터로 사용)
  const skipRef = useRef(0);
  // 클린업 또는 isEnabled=false 전환 시 진행 중인 페치를 중단하기 위한 플래그
  const stoppedRef = useRef(false);
  // 다음 게시글 예약 타이머 핸들 (클린업 시 취소에 사용)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    // 폴백 세션 시작 — 중단 플래그·커서·상태 초기화
    stoppedRef.current = false;
    skipRef.current = 0;
    dispatch({ type: 'RESET' });

    const fetchOne = async () => {
      // 컴포넌트가 언마운트되거나 isEnabled가 false로 바뀐 경우 중단
      if (stoppedRef.current) return;

      dispatch({ type: 'FETCH_START' });

      try {
        const { posts = [] } = await getFeedPosts(skipRef.current, 1);

        // 비동기 응답이 돌아왔을 때 이미 중단 상태이면 무시
        if (stoppedRef.current) return;

        if (posts.length === 0) {
          // 더 불러올 게시글 없음 → 폴백 종료
          dispatch({ type: 'DONE' });
          return;
        }

        dispatch({ type: 'FETCH_SUCCESS', post: mapPost(posts[0]) });
        skipRef.current += 1;

        // SLOW_LOAD_DELAY_MS 후 다음 게시글 요청 예약
        timerRef.current = setTimeout(fetchOne, SLOW_LOAD_DELAY_MS);
      } catch {
        // 네트워크 오류 등 예외 발생 시 폴백 종료
        if (!stoppedRef.current) {
          dispatch({ type: 'DONE' });
        }
      }
    };

    fetchOne();

    return () => {
      // isEnabled 변경 또는 언마운트 시 진행 중인 페치·타이머 정리
      stoppedRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isEnabled]);

  return state;
}
