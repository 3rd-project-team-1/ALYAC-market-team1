import { useEffect, useState } from 'react';

import { PostCardModel } from '@/entities/feed/ui/PostCard';
import { postApi } from '@/entities/post';

export function useFeedPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostCardModel[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    fetchFeed(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchFeed = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const response = await postApi.getFeedPosts(pageNum, limit);
      type FeedPost = {
        id: string;
        content: string;
        image?: string;
        heartCount: number;
        commentCount: number;
        author: {
          username: string;
          accountname: string;
          image: string;
        };
      };
      const feedPosts = ((response.data as any).posts ?? []) as FeedPost[];
      const mappedPosts: PostCardModel[] = feedPosts.map((post: FeedPost) => ({
        id: post.id,
        content: post.content,
        image: post.image && post.image.trim() !== '' ? post.image : undefined,
        heartCount: post.heartCount,
        commentCount: post.commentCount,
        author: {
          username: post.author.username,
          accountname: post.author.accountname,
          image: post.author.image,
        },
      }));
      setPosts((prev) => (pageNum === 1 ? mappedPosts : [...prev, ...mappedPosts]));
      setHasMore(feedPosts.length === limit);
    } catch (error) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  return { isLoading, posts, setPosts, loadMore, hasMore };
}
