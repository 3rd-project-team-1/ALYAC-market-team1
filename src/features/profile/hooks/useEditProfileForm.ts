import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { userApi } from '@/entities/user/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { uploadSingleImage } from '@/shared/api';

import { type EditProfileInput, editProfileSchema } from '../model/edit-profile.schema';

export function useEditProfileForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile, isLoading } = useProfile();
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

  const updateMutation = useMutation({
    mutationFn: async (data: EditProfileInput) => {
      //프로필에 계정이 있는지 체크
      if (!profile?.accountname) {
        throw new Error('Account name is required');
      }
      const imagePath = profileImageFile
        ? await uploadSingleImage(profileImageFile)
        : (profile.image ?? '');

      return userApi.updateProfile({
        user: {
          username: data.username,
          accountname: profile.accountname,
          intro: data.intro ?? '',
          image: imagePath,
        },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('프로필이 업데이트되었습니다');
      navigate(-1);
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error);
      toast.error('프로필 업데이트에 실패했습니다');
    },
  });

  const submitEditProfile = handleSubmit((data) => updateMutation.mutate(data));

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
