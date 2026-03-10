import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useProfile } from '@/entities/user/hooks/useProfile';
import { useUpdateProfile } from '@/entities/user/hooks/useUpdateProfile';
import { uploadSingleImage } from '@/shared/api';

import { type EditProfileInput, editProfileSchema } from '../model/edit-profile.schema';

export function useEditProfileForm() {
  const navigate = useNavigate();

  const { data: profile, isLoading } = useProfile();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
    values: {
      username: profile?.username ?? '',
      intro: profile?.intro ?? '',
    },
  });
  const updateMutation = useUpdateProfile();
  const submitEditProfile = handleSubmit(async (data) => {
    if (!profile?.accountname) throw new Error('Account name is required');

    const imagePath = profileImageFile
      ? await uploadSingleImage(profileImageFile)
      : (profile.image ?? '');

    updateMutation.mutate(
      {
        user: {
          username: data.username,
          accountname: profile.accountname,
          intro: data.intro ?? '',
          image: imagePath,
        },
      },
      {
        onSuccess: () => {
          toast.success('프로필이 업데이트되었습니다');
          navigate(-1);
        },
        onError: () => {
          toast.error('프로필 업데이트에 실패했습니다');
        },
      },
    );
  });

  return {
    profile,
    isLoading,
    register,
    errors,
    submitEditProfile,
    isPending: updateMutation.isPending,
    setProfileImageFile,
    watch,
  };
}
