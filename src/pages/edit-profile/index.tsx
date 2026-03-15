import { Helmet } from 'react-helmet-async';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { EditProfileForm } from '@/features/profile/ui/EditProfileForm';
import { LoadingSpinner } from '@/shared/ui';

export function EditProfilePage() {
  const { data: profile = null, isLoading } = useProfile();

  if (isLoading) {
    return <LoadingSpinner fullScreen message="프로필을 불러오는 중입니다..." />;
  }

  return (
    <>
      <Helmet>
        <title>프로필 수정 | Alyac Market</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main>
        <h1 className="sr-only">프로필 수정하기</h1>

        <EditProfileForm profile={profile} />
      </main>
    </>
  );
}
