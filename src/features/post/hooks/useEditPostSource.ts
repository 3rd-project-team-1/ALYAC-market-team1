import { useLocation, useParams } from 'react-router-dom';

import { usePostQuery } from '@/entities/post';
import type { Post } from '@/entities/post';

interface LocationState {
  post?: Post;
}

export function useEditPostSource() {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { data: queriedPost, isLoading: isPostLoading } = usePostQuery(postId);
  const post = state?.post ?? queriedPost;

  return {
    postId,
    post,
    isPostLoading,
  };
}
