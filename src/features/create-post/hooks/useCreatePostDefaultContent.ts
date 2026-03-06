import { useLocation } from 'react-router-dom';

interface LocationState {
  content?: string;
}

export function useCreatePostDefaultContent() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  return {
    defaultContent: state?.content ?? '',
  };
}
