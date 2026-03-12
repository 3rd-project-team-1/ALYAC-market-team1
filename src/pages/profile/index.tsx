import { useProfileTargetAccount } from '@/features/profile/hooks/useProfileTargetAccount';
import { ProfilePostsSection, ProfileProductsSection, ProfileTopSection } from '@/features/profile';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { cn } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';
import { TopBasicNav, useLogoutMenu } from '@/widgets/top-basic-nav';

export function ProfilePage() {
  const { moreMenu, modal } = useLogoutMenu();
  const { targetAccountname } = useProfileTargetAccount();
  const { isLoading } = useProfile(targetAccountname ?? undefined);

  if (isLoading) {
    return <LoadingSpinner fullScreen message="프로필을 불러오는 중..." />;
  }

  return (
    <div className={cn('pb-20')}>
      <TopBasicNav moreMenu={moreMenu} modal={modal} />
      <ProfileTopSection />
      <ProfileProductsSection />
      <ProfilePostsSection />
    </div>
  );
}
