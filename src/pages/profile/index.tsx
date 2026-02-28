import { ProfilePostsSection, ProfileProductsSection, ProfileTopSection } from '@/features/profile';
import { TopBasicNav, useLogoutMenu } from '@/widgets/top-basic-nav';

export function ProfilePage() {
  const { moreMenu, modal } = useLogoutMenu();

  return (
    <div className="pb-20">
      <TopBasicNav moreMenu={moreMenu} modal={modal} />
      <ProfileTopSection />
      <ProfileProductsSection />
      <ProfilePostsSection />
    </div>
  );
}
