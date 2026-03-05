import { ProfilePostsSection, ProfileProductsSection, ProfileTopSection } from '@/features/profile';
import { cn } from '@/shared/lib';
import { TopBasicNav, useLogoutMenu } from '@/widgets/top-basic-nav';

export function ProfilePage() {
  const { moreMenu, modal } = useLogoutMenu();

  return (
    <div className={cn('pb-20')}>
      <TopBasicNav moreMenu={moreMenu} modal={modal} />
      <ProfileTopSection />
      <ProfileProductsSection />
      <ProfilePostsSection />
    </div>
  );
}
