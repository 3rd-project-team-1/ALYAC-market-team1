import { useState } from 'react';

export function usePostEditorFocus(hasContent: boolean) {
  const [isFocused, setIsFocused] = useState(false);
  const [hadContent, setHadContent] = useState(false);

  const showError = hadContent && !hasContent;

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trim().length > 0) {
      setHadContent(true);
    }
  };

  return {
    isFocused,
    showError,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    handleContentChange,
  };
}
