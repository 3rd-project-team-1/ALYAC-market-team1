import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import axiosInstance from '@/shared/api/axios';

export interface EditProfileFormValues {
  username: string;
  intro: string;
}

export function useEditProfileForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile, isLoading } = useProfile();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    mode: 'onChange',
    values: {
      username: profile?.username ?? '',
      intro: profile?.intro ?? '',
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: EditProfileFormValues) => {
      let imagePath = profile?.image ?? '';

      if (profileImageFile) {
        const formData = new FormData();
        formData.append('image', profileImageFile);
        const res = await axiosInstance.post<{ path: string }>('/api/image/uploadfile', formData);
        imagePath = res.data.path;
      }

      return userApi.updateProfile({
        user: {
          username: data.username,
          accountname: profile?.accountname ?? '',
          intro: data.intro,
          image: imagePath,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate(-1);
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
  };
}
