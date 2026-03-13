import { API_ENDPOINT, api } from '@/shared/api';

import { type SearchUsersResponse, searchUsersResponseSchema } from '../model/user.schema';

/**
 * 사용자 검색 API
 * @param keyword - 검색 키워드
 * @returns 검색된 사용자 목록
 * @example
 * ```ts
 * const users = await searchUsers('홍길동');
 * ```
 */
export const searchUsers = (keyword: string): Promise<SearchUsersResponse> =>
  api.get(API_ENDPOINT.USER_SEARCH, searchUsersResponseSchema, { keyword });
