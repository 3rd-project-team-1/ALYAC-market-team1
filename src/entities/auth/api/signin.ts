import { API_ENDPOINT, api } from '@/shared/api';

import {
  type SigninRequest,
  type SigninResponse,
  signinResponseSchema,
} from '../model/auth.schema';

/**
 * 로그인 API
 * @param data - 로그인 요청 데이터 (email, password)
 * @returns 로그인 응답 (user, accessToken, refreshToken)
 */
export const signIn = (data: SigninRequest): Promise<SigninResponse> =>
  api.post(API_ENDPOINT.AUTH_SIGNIN, data, signinResponseSchema);
