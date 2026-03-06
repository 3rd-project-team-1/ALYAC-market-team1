import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const getFeedPosts = async (skip = 0, limit = 10) => {
  const response = await axiosInstance.get(API_ENDPOINT.POST_FEED(skip, limit));

  return response;
};
