import { useSignInForm } from '../hooks/useSignInForm';
import { SignInEmailField } from './SignInEmailField';
import { SignInPasswordField } from './SignInPasswordField';
import { SignInSubmitButton } from './SignInSubmitButton';

export function SignInForm() {
  const { register, handleSubmit, errors, isValid, isPending, onSubmit } = useSignInForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SignInEmailField register={register} error={errors.email?.message} />
      <SignInPasswordField register={register} error={errors.password?.message} />
      <SignInSubmitButton isValid={isValid} isPending={isPending} />
    </form>
  );
}
