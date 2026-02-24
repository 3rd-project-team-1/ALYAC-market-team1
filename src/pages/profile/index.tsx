import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import messageCircle from '@/shared/assets/icons/message-circle.svg';
import shareIcon from '@/shared/assets/icons/share.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { Button } from '@/shared/ui/button';
import { TopBasicNav } from '@/widgets/top-basic-nav';

type ViewMode = 'grid' | 'list';

export function ProfilePage() {
  const myUserId = localStorage.getItem('lastUserId') ?? undefined;
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const { profile, isLoading, isMyProfile } = useProfile(accountname);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isFollowing, setIsFollowing] = useState(profile?.isfollow ?? false);

  // 팔로우/언팔로우 토글
  const handleFollowToggle = async () => {
    if (!profile) return;
    try {
      if (isFollowing) {
        await userApi.unfollow(profile.accountname);
      } else {
        await userApi.follow(profile.accountname);
      }
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error('팔로우 처리 중 오류 발생:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen flex-col">
        <TopBasicNav userId={myUserId} />
        <div className="flex flex-1 items-center justify-center">
          <div className="border-muted border-t-foreground h-8 w-8 animate-spin rounded-full border-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <TopBasicNav userId={myUserId} />

      {/* 프로필 정보 */}
      <section className="px-6 pt-[60px] pb-6">
        {/* 아바타 + 팔로워/팔로잉 */}
        <div className="flex items-center justify-center gap-12">
          {/* 팔로워 */}
          <button className="flex flex-col items-center gap-1">
            <span className="text-foreground text-xl font-bold">{profile?.followerCount ?? 0}</span>
            <span className="text-muted-foreground text-xs">Followers</span>
          </button>

          {/* 아바타 */}
          <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
            {profile?.image ? (
              <img
                src={profile.image}
                alt={profile.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
            )}
          </div>

          {/* 팔로잉 */}
          <button className="flex flex-col items-center gap-1">
            <span className="text-foreground text-xl font-bold">
              {profile?.followingCount ?? 0}
            </span>
            <span className="text-muted-foreground text-xs">Followings</span>
          </button>
        </div>

        {/* 이름 & 계정명 & 소개글 */}
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-foreground text-base font-semibold">
            {profile?.username ?? '이름 없음'}
          </h1>
          <p className="text-muted-foreground mt-0.5 text-sm">@{profile?.accountname ?? ''}</p>
          {profile?.intro && (
            <p className="text-muted-foreground mt-1.5 text-center text-sm">{profile.intro}</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {isMyProfile ? (
            <>
              {/* 내 프로필: 프로필 수정 / 상품 등록 */}
              <Button
                variant="outline"
                className="flex-1 rounded-full text-sm font-medium"
                onClick={() => navigate('/edit-profile')}
              >
                프로필 수정
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full text-sm font-medium"
                onClick={() => navigate('/create-product')}
              >
                상품 등록
              </Button>
            </>
          ) : (
            <>
              {/* 타인 프로필: 채팅 / 팔로우 / 공유 */}
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-full"
                aria-label="채팅하기"
                onClick={() => navigate('/chat')}
              >
                <img src={messageCircle} alt="채팅" width={20} height={20} />
              </Button>

              <Button
                className={`rounded-full px-8 text-sm font-semibold text-white ${isFollowing ? 'bg-muted-foreground' : 'bg-[#3C9E00] hover:bg-[#2d7a00]'}`}
                onClick={handleFollowToggle}
              >
                {isFollowing ? '언팔로우' : '팔로우'}
              </Button>

              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-full"
                aria-label="공유하기"
              >
                <img src={shareIcon} alt="공유" width={20} height={20} />
              </Button>
            </>
          )}
        </div>
      </section>

      {/* 게시글 탭 */}
      <section className="border-border flex-1 border-t">
        <div className="border-border flex justify-end border-b">
          {/* 리스트 뷰 버튼 */}
          <button
            className="flex items-center justify-center px-5 py-2.5"
            onClick={() => setViewMode('list')}
            aria-label="리스트 뷰"
          >
            {viewMode === 'list' ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.75 3.25H3.25V7.58333H22.75V3.25Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.75 3.25H3.25V7.58333H22.75V3.25Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {/* 그리드 뷰 버튼 */}
          <button
            className="flex items-center justify-center px-5 py-2.5"
            onClick={() => setViewMode('grid')}
            aria-label="그리드 뷰"
          >
            {viewMode === 'grid' ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 빈 게시글 */}
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다.</p>
        </div>
      </section>
    </div>
  );
}
