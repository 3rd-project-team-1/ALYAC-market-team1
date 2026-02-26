import { useState } from 'react';

export function useChatComposer(onSubmit?: (message: string) => void) {
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
