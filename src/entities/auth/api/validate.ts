import axiosInstance from '@/shared/api/axios';

// 이메일 중복 체크 API
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.post('/api/user/emailvalid', { user: { email } });
  return !response.data.ok;
};
// 계정 ID 중복 체크 API
export const checkAccountnameDuplicate = async (accountname: string): Promise<boolean> => {
  const response = await axiosInstance.post('/api/user/accountnamevalid', {
    user: { accountname },
  });
  return !response.data.ok;
};
