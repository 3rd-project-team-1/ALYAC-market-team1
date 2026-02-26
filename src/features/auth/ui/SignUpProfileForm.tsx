import { useSignUpProfileForm } from '@/features/auth';
import { ProfileImageInput } from '@/features/profile';
import { cn } from '@/shared/lib/utils';
import { FormField } from '@/shared/ui/FormField';
import { Button } from '@/shared/ui/button';

export function SignUpProfileForm() {
  const { register, handleSubmit, onSubmit, errors, isValid, setProfileImageFile, isPending } =
    useSignUpProfileForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProfileImageInput onImageChange={(file) => setProfileImageFile(file)} />

      <div className="space-y-2">
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

      <div className="space-y-2">
        <FormField
          type="text"
          label="계정 ID"
          placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
          register={register('accountname', {
            required: '계정 ID를 입력해주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._]+$/,
              message: '*영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.',
            },
          })}
          error={errors.accountname}
        />
      </div>
      <div className="space-y-2">
        <FormField
          type="text"
          label="소개"
          placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
          register={register('intro', { required: '60자 이내로 작성해주세요', maxLength: 60 })}
          error={errors.intro}
        />
      </div>
      <Button
        type="submit"
        disabled={!isValid || isPending}
        className={cn(
          'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
          isValid
            ? 'bg-[var(--color-primary-green)] hover:bg-[var(--color-primary-green-hover)] active:bg-[var(--color-primary-green-hover)]'
            : 'cursor-not-allowed bg-[var(--color-primary-green-light)] text-white',
        )}
      >
        {isPending ? '처리 중...' : '알약마켓 시작하기'}
      </Button>
    </form>
  );
}
