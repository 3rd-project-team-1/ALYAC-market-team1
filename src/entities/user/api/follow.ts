import { API_ENDPOINT, axiosInstance } from '@/shared/api';

export const follow = (accountname: string) =>
  axiosInstance.post(API_ENDPOINT.PROFILE_FOLLOW(accountname));
