import { useRef, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import axiosInstance from '@/shared/api/axios';
import uploadFile from '@/shared/assets/icons/upload-file.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';

type FormValues = {
  username: string;
  intro: string;
};

export function EditProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? null;

  const { profile, isLoading } = useProfile();

  // 사용자가 새로 선택한 이미지만 별도 관리 (null이면 profile.image 사용)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [newUploadedImagePath, setNewUploadedImagePath] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파생 상태: 새 이미지가 없으면 서버 값 사용
  const imagePreview = newImagePreview ?? profile?.image ?? null;
  const uploadedImagePath = newUploadedImagePath ?? profile?.image ?? '';

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setNewImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axiosInstance.post<{ path: string }>('/api/image/uploadfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewUploadedImagePath(res.data.path);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  // 프로필 수정 mutation
  const updateMutation = useMutation({
    mutationFn: (data: FormValues) =>
      userApi.updateProfile({
        user: {
          username: data.username,
          accountname: myAccountname ?? '',
          intro: data.intro,
          image: uploadedImagePath,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', myAccountname] });
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
      {/* 프로필 이미지 */}
      <div className="flex justify-center py-8">
        <div className="relative">
          <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
            {imagePreview ? (
              <img src={imagePreview} alt="프로필 이미지" className="h-full w-full object-cover" />
            ) : (
              <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
            )}
          </div>
          <button
            type="button"
            onClick={handleImageClick}
            className="absolute right-0 bottom-0 transition-all hover:brightness-75"
            aria-label="이미지 변경"
          >
            <img src={uploadFile} alt="이미지 변경" width={28} height={28} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* 입력 폼 */}
      <form
        onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
        className="flex flex-col gap-6 px-6"
      >
        {/* 사용자 이름 */}
        <div className="flex flex-col gap-1">
          <label className="text-foreground text-sm font-medium">사용자 이름</label>
          <input
            {...register('username', {
              required: '사용자 이름을 입력해주세요.',
              minLength: { value: 2, message: '사용자 이름은 최소 2자 이상이어야 합니다.' },
              maxLength: { value: 10, message: '사용자 이름은 10자 이하여야 합니다.' },
            })}
            placeholder="이름을 입력하세요."
            className={`text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none ${errors.username ? 'border-destructive' : 'border-border'}`}
          />
          {errors.username && <p className="text-destructive text-xs">{errors.username.message}</p>}
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
          <input
            {...register('intro', {
              maxLength: { value: 60, message: '소개는 60자 이하여야 합니다.' },
            })}
            placeholder="간단한 자기 소개를 입력하세요."
            className={`text-foreground placeholder:text-muted-foreground w-full border-b py-2 text-sm outline-none ${errors.intro ? 'border-destructive' : 'border-border'}`}
          />
          {errors.intro ? (
            <p className="text-destructive text-xs">{errors.intro.message}</p>
          ) : (
            <p className="text-muted-foreground text-xs">최대 60자</p>
          )}
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
