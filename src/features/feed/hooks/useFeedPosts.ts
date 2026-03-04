import { useCallback, useEffect, useRef, useState } from 'react';

import { PostCardModel } from '@/entities/feed/ui/PostCard';
import { postApi } from '@/entities/post';
import type { Post } from '@/entities/post';

export function useFeedPosts() {
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩
  const [isFetchingMore, setIsFetchingMore] = useState(false); // 추가 로딩
  const [posts, setPosts] = useState<PostCardModel[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false); // 중복 fetch 방지용 ref
  const limit = 10;

  // 최초 마운트 시 한 번만 fetch
  useEffect(() => {
    fetchFeed(0);
  }, []);

  // skip이 변경될 때(추가 로드) fetch
  useEffect(() => {
    if (skip > 0) fetchFeed(skip);
  }, [skip]);

  const fetchFeed = async (skipNum: number) => {
    if (isFetchingRef.current) return; // 이미 fetch 중이면 중복 방지
    isFetchingRef.current = true;
    if (skipNum === 0) {
      setIsLoading(true);
    } else {
      setIsFetchingMore(true);
    }
    try {
      const response = await postApi.getFeedPosts(skipNum, limit);
      console.log('Feed API 응답(skip:', skipNum, '):', response.data);
      const feedPosts: Post[] = response.data.post ?? [];
      // createdAt 기준 내림차순 정렬
      feedPosts.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      const mappedPosts: PostCardModel[] = feedPosts.map((post) => ({
        id: post.id,
        content: post.content,
        image: post.image && post.image.trim() !== '' ? post.image : undefined,
        hearted: post.hearted ?? false,
        heartCount: post.heartCount,
        commentCount: post.commentCount,
        createdAt: post.createdAt,
        author: {
          username: post.author.username,
          accountname: post.author.accountname,
          image: post.author.image,
        },
      }));
      setPosts((prev) => {
        let merged;
        if (skipNum === 0) {
          merged = mappedPosts;
        } else {
          merged = [...prev, ...mappedPosts];
        }
        // id 기준 중복 제거
        const unique = merged.filter(
          (post, idx, arr) => arr.findIndex((p) => p.id === post.id) === idx,
        );
        // 최신순 정렬
        unique.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        return unique;
      });
      setHasMore(feedPosts.length === limit);
    } catch (error) {
      setHasMore(false);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (hasMore && !isFetchingRef.current) {
      setSkip((prev) => prev + limit);
    }
  }, [hasMore]);

  return { isLoading, isFetchingMore, posts, setPosts, loadMore, hasMore };
}
