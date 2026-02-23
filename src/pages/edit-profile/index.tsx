import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';
import uploadFile from '@/shared/assets/icons/upload-file.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { useImageUpload } from '@/shared/hooks/useImageUpload';

type FormValues = {
  username: string;
  intro: string;
};

export function EditProfilePage() {
  const [accountname, setAccountname] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { fileInputRef, imagePreview, setImagePreview, handleImageClick, handleImageChange } =
    useImageUpload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { username: '', intro: '' },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenInfo = getTokenUserInfo();
        if (tokenInfo?.accountname) {
          const res = await userApi.getProfile(tokenInfo.accountname);
          const p = res.data.profile;
          // API 데이터로 폼 초기값 세팅
          reset({ username: p.username, intro: p.intro ?? '' });
          setAccountname(p.accountname);
          setImagePreview(p.image ?? null);
        }
      } catch (error) {
        console.error('프로필 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset, setImagePreview]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // TODO: 프로필 수정 API 연동
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 px-6">
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
            value={accountname}
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
      </form>
    </div>
  );
}
