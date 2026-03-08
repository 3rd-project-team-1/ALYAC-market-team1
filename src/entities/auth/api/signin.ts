import { API_ENDPOINT, api } from '@/shared/api';

import {
  type SigninRequest,
  type SigninResponse,
  signinResponseSchema,
} from '../model/auth.schema';

export const signIn = (data: SigninRequest): Promise<SigninResponse> =>
  api.post(API_ENDPOINT.AUTH_SIGNIN, data, signinResponseSchema);
