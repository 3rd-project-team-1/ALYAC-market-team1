import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import { Button } from '@/shared/ui/button';
import { TopMainNav } from '@/widgets/top-main-nav';

<<<<<<< HEAD
// 포스트카드 컴포넌트
// import { PostCard } from '@/entities/post/ui/PostCard';
// 텍스트카드 컴포넌트
// import { TextCard } from '@/entities/text/ui/TextCard';

interface UserProfile {
  profile: {
    followerCount: number;
  };
}

export function FeedPage() {
  const [haveFollowers, setHaveFollowers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userApi.getProfile('exampleUser');
        const profile: UserProfile = response.data;
        setHaveFollowers(profile.profile.followerCount > 0);
      } catch (error) {
        console.error('프로필 조회 실패:', error);
        setHaveFollowers(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSearchClick = () => {
    navigate('/search');
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
=======
export function FeedPage() {
  const HaveFollwers = true;
  // 팔로워 api를 부르고, 팔로워가 있으면 true, 없으면 false로 바꿔주면 됩니다.
>>>>>>> develop

  return (
    <>
      <TopMainNav title="얄약마켓 피드" />
<<<<<<< HEAD
      {haveFollowers ? (
=======
      {HaveFollwers ? (
>>>>>>> develop
        <main className="mx-auto max-w-5xl">
          {/* <텍스트카드 />
          <게시글 리스트 /> */}
        </main>
      ) : (
        <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center">
          <p className="text-lg text-gray-500">
            팔로우하는 사용자가 없습니다. 관심있는 사용자를 팔로우 해보세요!
          </p>
<<<<<<< HEAD
          <Button onClick={handleSearchClick} variant="outline" className="mt-4">
            검색하기
          </Button>
=======
>>>>>>> develop
        </main>
      )}
    </>
  );
}
