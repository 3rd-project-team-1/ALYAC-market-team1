import type { Profile } from '@/entities/user/types';
import { useEditProfileForm } from '@/features/profile';
import { cn } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { FormField } from '@/shared/ui';
import { TopUploadNav } from '@/widgets/top-upload-nav';

import { ProfileImageInput } from './ProfileImageInput';

interface EditProfileFormProps {
  profile: Profile | null;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const { register, errors, watch, submitEditProfile, isPending, setProfileImageFile } =
    useEditProfileForm();
  const intro = watch('intro');
  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-12')}>
      <TopUploadNav label="저장" disabled={isPending} onSubmit={() => void submitEditProfile()} />

      <div className={cn('mt-8')}>
        <ProfileImageInput
          onImageChange={setProfileImageFile}
          initialImage={getImageUrl(profile?.image) ?? undefined}
        />
      </div>

      <form onSubmit={submitEditProfile} className={cn('flex flex-col gap-6 px-6')}>
        {/* 사용자 이름 */}
        <FormField
          type="text"
          label="사용자 이름"
          placeholder="2~10자 이내여야 합니다."
          register={register('username')}
          error={errors.username}
        />

        {/* 계정 ID */}
        <div className={cn('flex flex-col gap-1')}>
          <label className={cn('text-foreground text-sm font-medium')}>계정 ID</label>
          <input
            type="text"
            value={profile?.accountname ?? ''}
            readOnly
            className={cn(
              'border-border text-foreground w-full border-b py-2 text-sm outline-none',
            )}
          />
          <p className={cn('text-muted-foreground text-xs')}>계정 ID는 변경할 수 없습니다.</p>
        </div>

        {/* 소개 */}
        <div className={cn('flex flex-col gap-1')}>
          <div className={cn('flex items-center justify-between')}>
            <label className={cn('text-foreground text-sm font-medium')}>소개</label>
            <span
              className={cn(
                'text-xs',
                (intro?.length ?? 0) > 60 ? 'text-destructive' : 'text-muted-foreground',
              )}
            >
              {intro?.length ?? 0}/60
            </span>
          </div>
          <textarea
            {...register('intro')}
            placeholder="간단한 자기 소개를 입력하세요."
            rows={1}
            className={cn(
              'border-border text-foreground placeholder:text-muted-foreground w-full resize-none border-b py-2 text-sm outline-none',
            )}
          />
          {errors.intro && <p className="text-destructive text-xs">{errors.intro.message}</p>
        </div>
      </form>
    </div>
  );
}
