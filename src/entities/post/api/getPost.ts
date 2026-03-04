import axiosInstance from '@/shared/api/axios';

import type { PostResponse } from '../types';

export const getPost = (postId: string) => axiosInstance.get<PostResponse>(`/api/post/${postId}`);
