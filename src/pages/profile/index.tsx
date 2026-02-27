import { ProfilePostsSection, ProfileProductsSection, ProfileTopSection } from '@/features/profile';
import { TopBasicNav, useLogoutMenu } from '@/widgets/top-basic-nav';

export function ProfilePage() {
  const { moreMenu, modal } = useLogoutMenu({ onSettings: () => {} });

  return (
    <div>
      <TopBasicNav moreMenu={moreMenu} modal={modal} />
      <ProfileTopSection />
      <ProfileProductsSection />
      <ProfilePostsSection />
    </div>
  );
}
