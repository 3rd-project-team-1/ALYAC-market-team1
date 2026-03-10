import { useEffect, useRef, useState } from 'react';

import { getFeedPosts } from '@/entities/post/api/getFeedPosts';
import type { Post } from '@/entities/post/model/post.schema';

import type { PostCardModel } from '../model/types';

/** 게시글 하나를 불러온 후 다음 게시글까지 대기 시간 (ms) */
const SLOW_LOAD_DELAY_MS = 800;

function mapPost(post: Post): PostCardModel {
  return {
    id: post.id,
    content: post.content,
    image: post.image && post.image.trim() !== '' ? post.image : undefined,
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
  const [posts, setPosts] = useState<PostCardModel[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const skipRef = useRef(0);
  const stoppedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    // 새로운 폴백 세션 시작 — 이전 상태 초기화
    stoppedRef.current = false;
    skipRef.current = 0;
    setPosts([]);
    setIsDone(false);

    const fetchOne = async () => {
      if (stoppedRef.current) return;

      setIsFetching(true);

      try {
        const response = await getFeedPosts(skipRef.current, 1);

        if (stoppedRef.current) return;

        const fetched = response.posts ?? [];

        if (fetched.length === 0) {
          // 더 이상 게시글 없음 → 종료
          setIsFetching(false);
          setIsDone(true);
          return;
        }

        const mapped = mapPost(fetched[0]);
        setPosts((prev) => {
          // 중복 방지
          if (prev.some((p) => p.id === mapped.id)) return prev;
          return [...prev, mapped];
        });
        skipRef.current += 1;
        setIsFetching(false);

        // 다음 게시글 예약
        timerRef.current = setTimeout(() => {
          fetchOne();
        }, SLOW_LOAD_DELAY_MS);
      } catch {
        if (!stoppedRef.current) {
          setIsFetching(false);
          setIsDone(true);
        }
      }
    };

    fetchOne();

    return () => {
      stoppedRef.current = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isEnabled]);

  return { posts, isFetching, isDone };
}
