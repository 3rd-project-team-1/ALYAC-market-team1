import { useProfile } from '@/entities/user/hooks/useProfile';
import { EditProfileForm } from '@/features/profile/ui/EditProfileForm';
import { LoadingSpinner } from '@/shared/ui';

export function EditProfilePage() {
  const { data: profile = null, isLoading } = useProfile();

  if (isLoading) {
    return <LoadingSpinner fullScreen message="프로필을 불러오는 중입니다..." />;
  }

  return <EditProfileForm profile={profile} />;
}
