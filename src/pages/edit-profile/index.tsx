import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { userApi } from '@/entities/user/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { ProfileImageUploader } from '@/features/profile/ui/ProfileImageUploader';
import axiosInstance from '@/shared/api/axios';
import { getImageUrl } from '@/shared/lib/utils';
import { FormField } from '@/shared/ui/FormField';
import { TopUploadNav } from '@/widgets/top-upload-nav';

type FormValues = {
  username: string;
  intro: string;
};

export function EditProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { profile, isLoading } = useProfile();
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    // profile이 로드된 후에도 defaultValues가 반영되도록 values 옵션 사용
    values: {
      username: profile?.username ?? '',
      intro: profile?.intro ?? '',
    },
  });
  // 프로필 수정 mutation
  const updateMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      let imagePath = profile?.image ?? '';

      if (profileImageFile) {
        const formData = new FormData();
        formData.append('image', profileImageFile);
        const res = await axiosInstance.post<{ path: string }>('/api/image/uploadfile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
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

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="border-muted border-t-foreground h-8 w-8 animate-spin rounded-full border-2" />
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <TopUploadNav
        label="저장"
        disabled={updateMutation.isPending}
        onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
      />
      <ProfileImageUploader
        onImageChange={setProfileImageFile}
        initialImage={getImageUrl(profile?.image) ?? undefined}
      />
      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
        className="flex flex-col gap-6 px-6"
      >
        {/* 사용자 이름 */}
        <div className="flex flex-col gap-1">
          <FormField
            type="text"
            label="사용자 이름"
            placeholder="2~10자 이내여야 합니다."
            register={register('username', {
              required: '사용자 이름을 입력해주세요.',
              minLength: { value: 2, message: '2자 이상 입력해주세요.' },
              maxLength: { value: 10, message: '10자 이하로 입력해주세요.' },
            })}
            error={errors.username}
          />
        </div>

        {/* 계정 ID */}
        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm font-medium">계정 ID</label>
          <input
            type="text"
            value={profile?.accountname ?? ''}
            readOnly
            className="border-border text-foreground w-full border-b py-2 text-sm outline-none"
          />
          <p className="text-muted-foreground text-xs">계정 ID는 변경할 수 없습니다.</p>
        </div>

        {/* 소개 */}
        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm font-medium">소개</label>
          <textarea
            {...register('intro', {
              maxLength: { value: 60, message: '소개는 60자 이내로 입력해주세요.' },
            })}
            placeholder="간단한 자기 소개를 입력하세요."
            rows={1}
            className="border-border text-foreground placeholder:text-muted-foreground w-full resize-none border-b py-2 text-sm outline-none"
          />
          {errors.intro && (
            <p className="text-destructive text-xs">{errors.intro.message}</p>
          )}
          <p className="text-muted-foreground text-xs">최대 60자</p>
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-primary text-primary-foreground mt-2 rounded-lg py-3 text-sm font-medium disabled:opacity-50"
        >
          {updateMutation.isPending ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  );
}
