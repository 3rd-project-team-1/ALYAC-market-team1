import type { LoginRequest } from '@/entities/user';
import { API_ENDPOINT, api } from '@/shared/api';

import { type AuthResponse, authResponseSchema } from '../model/auth.schema';

export const signIn = (data: LoginRequest): Promise<AuthResponse> =>
  api.post(API_ENDPOINT.AUTH_SIGNIN, data, authResponseSchema);
