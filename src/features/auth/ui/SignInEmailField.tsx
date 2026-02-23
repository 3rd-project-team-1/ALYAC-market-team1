import { UseFormRegister } from 'react-hook-form';

import { SignInFormData } from '@/features/auth/hooks/useSignInForm';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface Props {
  register: UseFormRegister<SignInFormData>;
  error?: string;
}

export function SignInEmailField({ register, error }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-foreground block text-sm font-medium">
        이메일
      </Label>
      <Input
        id="email"
        type="email"
        {...register('email', {
          required: '이메일을 입력해 주세요.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '올바른 이메일 형식을 입력해 주세요.',
          },
        })}
        className={cn(
          'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
