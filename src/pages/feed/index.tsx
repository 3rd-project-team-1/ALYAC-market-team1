import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { PostCard, type PostCardModel, postApi } from '@/entities/post';
import { Button } from '@/shared/ui/button';
import { TopMainNav } from '@/widgets/top-main-nav';

export function FeedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostCardModel[]>([]);
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? '';

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
        console.error('피드 조회 실패:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleRewritePost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <TopMainNav title="얄약마켓 피드" />
      {posts.length > 0 ? (
        <main className="mx-auto max-w-5xl pt-[48px]">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isMyPost={post.author.accountname === myAccountname}
              onRewrite={handleRewritePost}
              onDelete={handleDeletePost}
            />
          ))}
        </main>
      ) : (
        <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center">
          <p className="text-lg text-gray-500">
            팔로우하는 사용자가 없습니다. 관심있는 사용자를 팔로우 해보세요!
          </p>
          <Button onClick={handleSearchClick} variant="outline" className="mt-4">
            검색하기
          </Button>
        </main>
      )}
    </>
  );
}
