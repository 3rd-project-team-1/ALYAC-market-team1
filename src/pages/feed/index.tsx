import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { PostCard, type PostCardModel, postApi } from '@/entities/post';
import { Button } from '@/shared/ui/button';
import { TopMainNav } from '@/widgets/top-main-nav';

export function FeedPage() {
  // 로딩 상태 및 포스트 목록 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostCardModel[]>([]);
  const navigate = useNavigate();

  // 현재 로그인한 사용자의 정보를 가져와 본인 포스트 여부 확인에 사용
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? '';

  // 컴포넌트 마운트 시 피드 포스트 목록을 조회
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await postApi.getFeedPosts();
        const feedPosts = response.data.post ?? [];

        // API 응답 데이터를 UI 모델에 맞춰 매핑
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

  // 검색 페이지로 이동
  const handleSearchClick = () => {
    navigate('/search');
  };

  // 포스트 상세/수정 페이지로 이동
  const handleRewritePost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  // 포스트 삭제 시 상태 업데이트
  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <TopMainNav title="얄약마켓 피드" />
      {posts.length > 0 ? (
        <main className="mx-auto max-w-5xl pt-[48px]">
          {/* 포스트가 있을 경우 PostCard 목록 렌더링 */}
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
        /* 포스트가 없을 경우(팔로우한 사람이 없거나 글이 없을 때) 표시할 UI */
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
