import { API_ENDPOINT, api } from '@/shared/api';

import {
  type SignupRequest,
  type SignupResponse,
  signupResponseSchema,
} from '../model/auth.schema';

/**
 * 회원가입 API
 * @param data - 회원가입 요청 데이터 (username, email, password, accountname, intro, image)
 * @returns 회원가입 응답 (message, user)
 * @example
 * ```ts
 * const result = await signUp({
 *   user: {
 *     username: '홍길동',
 *     email: 'test@example.com',
 *     password: 'password123',
 *     accountname: 'hong',
 *   }
 * });
 * ```
 */
export const signUp = (data: SignupRequest): Promise<SignupResponse> =>
  api.post(API_ENDPOINT.AUTH_SIGNUP, data, signupResponseSchema);
