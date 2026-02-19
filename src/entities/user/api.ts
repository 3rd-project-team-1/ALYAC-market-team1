import axiosInstance from '@/shared/api/axios';

import type { User } from './types';

export interface ProfileResponse {
  user: Omit<User, 'password'>;
}

export const userApi = {
  getProfile: (accountname: string) =>
    axiosInstance.get<ProfileResponse>(`/api/profile/${accountname}`),

  getMyProfile: () => axiosInstance.get<ProfileResponse>('/api/user/myinfo'),
};
