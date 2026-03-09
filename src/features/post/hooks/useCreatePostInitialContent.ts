import { useLocation } from 'react-router-dom';

interface LocationState {
  content?: string;
}

export function useCreatePostInitialContent() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  return {
    initialContent: state?.content ?? '',
  };
}
