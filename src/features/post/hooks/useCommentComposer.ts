import { useState } from 'react';

export function useCommentComposer(onSubmit?: (comment: string) => void) {
  const [value, setValue] = useState('');

  const canSubmit = value.trim().length > 0;

  const submit = () => {
    if (!canSubmit) {
      return;
    }
    onSubmit?.(value);
    setValue('');
  };

  return {
    value,
    setValue,
    canSubmit,
    submit,
  };
}
