import { useEffect, useState } from 'react';

import { PostCardModel } from '@/entities/feed/ui/PostCard';
import { postApi } from '@/entities/post';

export function useFeedPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostCardModel[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await postApi.getFeedPosts();
        const feedPosts = response.data.post ?? [];
        const mappedPosts: PostCardModel[] = feedPosts.map((post) => ({
          id: post.id,
          content: post.content,
          image: post.image || undefined,
          heartCount: post.heartCount,
          commentCount: post.commentCount,
          author: {
            username: post.author.username,
            accountname: post.author.accountname,
            image: post.author.image,
          },
        }));
        setPosts(mappedPosts);
      } catch (error) {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return { isLoading, posts, setPosts };
}
