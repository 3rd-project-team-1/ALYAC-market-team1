import type { Profile } from '@/entities/user/types';
import { getImageUrl } from '@/features/image/lib/getImageUrl';
import messageCircle from '@/shared/assets/icons/message-circle.svg';
import shareIcon from '@/shared/assets/icons/share.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { Button } from '@/shared/ui/button';

interface ProfileTopSectionProps {
  profile: Profile;
  isMyProfile: boolean;
  isFollowing: boolean;
  isFollowPending: boolean;
  onEditProfile: () => void;
  onCreateProduct: () => void;
  onOpenChat: () => void;
  onToggleFollow: () => void;
  onFollowersClick: () => void;
  onFollowingsClick: () => void;
}

export function ProfileTopSection({
  profile,
  isMyProfile,
  isFollowing,
  isFollowPending,
  onEditProfile,
  onCreateProduct,
  onOpenChat,
  onToggleFollow,
  onFollowersClick,
  onFollowingsClick,
}: ProfileTopSectionProps) {
  return (
    <section className="px-6 pt-[60px] pb-6">
      <div className="flex items-center justify-center gap-12">
        <button className="flex flex-col items-center gap-1" onClick={onFollowersClick}>
          <span className="text-foreground text-xl font-bold">{profile.followerCount ?? 0}</span>
          <span className="text-muted-foreground text-xs">followers</span>
        </button>

        <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
          {getImageUrl(profile.image) ? (
            <img
              src={getImageUrl(profile.image)!}
              alt={profile.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
          )}
        </div>

        <button className="flex flex-col items-center gap-1" onClick={onFollowingsClick}>
          <span className="text-foreground text-xl font-bold">{profile.followingCount ?? 0}</span>
          <span className="text-muted-foreground text-xs">followings</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-foreground text-base font-semibold">
          {profile.username ?? '이름 없음'}
        </h1>
        <p className="text-muted-foreground mt-0.5 text-sm">@{profile.accountname ?? ''}</p>
        {profile.intro && (
          <p className="text-muted-foreground mt-1.5 text-center text-sm">{profile.intro}</p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        {isMyProfile ? (
          <>
            <Button
              variant="outline"
              className="flex-1 rounded-full text-sm font-medium"
              onClick={onEditProfile}
            >
              프로필 수정
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full text-sm font-medium"
              onClick={onCreateProduct}
            >
              상품 등록
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-full"
              aria-label="채팅하기"
              onClick={onOpenChat}
            >
              <img src={messageCircle} alt="채팅" width={20} height={20} />
            </Button>

            <Button
              className={`rounded-full px-8 text-sm font-semibold text-white ${isFollowing ? 'bg-muted-foreground' : 'bg-[#3C9E00] hover:bg-[#2d7a00]'}`}
              onClick={onToggleFollow}
              disabled={isFollowPending}
            >
              {isFollowing ? '언팔로우' : '팔로우'}
            </Button>

            <Button variant="outline" size="icon-lg" className="rounded-full" aria-label="공유하기">
              <img src={shareIcon} alt="공유" width={20} height={20} />
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
