import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/shared/ui/form/input';
import { Label } from '@/shared/ui/label';

interface FormFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  readonly?: boolean;
  autoComplete?: string;
}

export function FormField({
  label,
  type = 'text',
  placeholder,
  register,
  error,
  autoComplete,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={register.name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      <Input
        id={register.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        {...register}
      />
      {error && <p className="text-destructive mt-1 text-sm">{error.message}</p>}
    </div>
  );
}
