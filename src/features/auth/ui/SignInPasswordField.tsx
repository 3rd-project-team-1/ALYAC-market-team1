import { UseFormRegister } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { SignInFormData } from '../hooks/useSignInForm';

interface Props {
  register: UseFormRegister<SignInFormData>;
  error?: string;
}

export function SignInPasswordField({ register, error }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password" className="text-foreground block text-sm font-medium">
        비밀번호
      </Label>
      <Input
        id="password"
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해 주세요.',
          minLength: { value: 6, message: '최소 6자 이상이어야 합니다.' },
        })}
        className={cn(
          'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error ? 'ring-1 ring-red-500' : '',
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
