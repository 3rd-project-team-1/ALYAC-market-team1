import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { useFeedPosts } from '@/features/feed/hooks/useFeedPosts';
import { FeedEmpty, FeedList } from '@/features/feed/ui';
import { TopMainNav } from '@/widgets/top-main-nav';

export function FeedPage() {
  const navigate = useNavigate();
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? '';

  const { isLoading, posts, setPosts } = useFeedPosts();

  const handleSearchClick = () => {
    navigate('/search');
  };
  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };
  const handleRewritePost = (postId: string) => {
    navigate(`/post/${postId}/edit`);
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
        <FeedList
          posts={posts}
          myAccountname={myAccountname}
          onRewrite={handleRewritePost}
          onDelete={handleDeletePost}
          onClick={handlePostClick}
        />
      ) : (
        <FeedEmpty onSearch={handleSearchClick} />
      )}
    </>
  );
}
