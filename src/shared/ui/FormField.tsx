import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

interface FormFieldProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        {...register}
      />
      {error && <p className="text-destructive mt-1 text-sm">{error.message}</p>}
    </div>
  );
}
