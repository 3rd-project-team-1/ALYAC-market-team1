import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import { type CreatePostInput, createPostSchema } from '../model/create-post.schema';

export function usePostFormState(defaultContent = '') {
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange',
    defaultValues: { content: defaultContent },
  });

  const content = useWatch({ control: form.control, name: 'content' });
  const hasContent = content?.trim().length > 0;

  useEffect(() => {
    form.reset({ content: defaultContent });
  }, [defaultContent, form]);

  return {
    form,
    hasContent,
  };
}
