import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const unfollow = (accountname: string) =>
  axiosInstance.delete(API_ENDPOINT.PROFILE_UNFOLLOW(accountname));
