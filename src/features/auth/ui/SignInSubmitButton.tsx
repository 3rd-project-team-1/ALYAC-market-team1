import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface Props {
  isValid: boolean;
  isPending: boolean;
}

export function SignInSubmitButton({ isValid, isPending }: Props) {
  return (
    <Button
      type="submit"
      disabled={!isValid || isPending}
      className={cn(
        'focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        isValid
          ? 'bg-[#6BCB26] hover:bg-[#5CB020]'
          : 'cursor-not-allowed bg-[#D9D9D9] text-gray-400',
      )}
    >
      {isPending ? '로그인 중...' : '로그인'}
    </Button>
  );
}
