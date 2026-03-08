import { API_ENDPOINT, api } from '@/shared/api';

import { type ValidationResponse, validationResponseSchema } from '../model/auth.schema';

/**
 * 이메일 중복 확인 API
 * @param email - 확인할 이메일 주소
 * @returns 중복 여부 (true: 중복, false: 사용 가능)
 * @example
 * ```ts
 * const isDuplicate = await checkEmailDuplicate('test@example.com');
 * if (isDuplicate) {
 *   console.log('이미 사용 중인 이메일입니다.');
 * }
 * ```
 */
export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response: ValidationResponse = await api.post(
    API_ENDPOINT.AUTH_EMAIL_VALID,
    { user: { email } },
    validationResponseSchema,
  );
  return !response.ok;
};
/**
 * 계정 ID 중복 확인 API
 * @param accountname - 확인할 계정 ID
 * @returns 중복 여부 (true: 중복, false: 사용 가능)
 * @example
 * ```ts
 * const isDuplicate = await checkAccountnameDuplicate('hong123');
 * if (isDuplicate) {
 *   console.log('이미 사용 중인 계정 ID입니다.');
 * }
 * ```
 */
export const checkAccountnameDuplicate = async (accountname: string): Promise<boolean> => {
  const response: ValidationResponse = await api.post(
    API_ENDPOINT.AUTH_ACCOUNTNAME_VALID,
    { user: { accountname } },
    validationResponseSchema,
  );
  return !response.ok;
};
