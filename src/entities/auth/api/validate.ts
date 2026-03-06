import { API_ENDPOINT, axiosInstance } from '@/shared/api';

import { validationResponseSchema } from '../model/auth.schema';

// 이메일 중복 체크 API
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response = await axiosInstance.post(API_ENDPOINT.AUTH_EMAIL_VALID, { user: { email } });
  const result = validationResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('이메일 중복 확인 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return !result.data.ok;
};

// 계정 ID 중복 체크 API
export const checkAccountnameDuplicate = async (accountname: string): Promise<boolean> => {
  const response = await axiosInstance.post(API_ENDPOINT.AUTH_ACCOUNTNAME_VALID, {
    user: { accountname },
  });
  const result = validationResponseSchema.safeParse(response.data);

  if (!result.success) {
    console.error('계정 ID 중복 확인 응답 검증 실패:', result.error);
    throw new Error('잘못된 서버 응답');
  }

  return !result.data.ok;
};
