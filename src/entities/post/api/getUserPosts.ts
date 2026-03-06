import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const getUserPosts = async (accountname: string) => {
  const response = await axiosInstance.get(API_ENDPOINT.POST_USER(accountname));

  return response;
};
