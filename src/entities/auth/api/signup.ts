import { API_ENDPOINT, api } from '@/shared/api';

import {
  type SignupRequest,
  type SignupResponse,
  signupResponseSchema,
} from '../model/auth.schema';

export const signUp = (data: SignupRequest): Promise<SignupResponse> =>
  api.post(API_ENDPOINT.AUTH_SIGNUP, data, signupResponseSchema);
