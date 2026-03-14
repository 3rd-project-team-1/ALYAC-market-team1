// shared/api/index.ts
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { z } from 'zod';

import axiosInstance from './axios';

type ApiMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface ApiRequestConfig<TData = unknown> {
  method: ApiMethod;
  url: string;
  data?: TData;
  params?: Record<string, unknown>;
}

/**
 * Zod 스키마 검증을 포함한 타입 안전한 API 요청
 * @param config - API 요청 설정 (method, url, data, params)
 * @param schema - 응답 검증을 위한 Zod 스키마
 * @returns 검증된 응답 데이터
 * @throws 스키마 검증 실패 시 Error
 */
async function apiRequest<TResponse>(
  config: ApiRequestConfig,
  schema: z.ZodType<TResponse>,
): Promise<TResponse> {
  try {
    const response: AxiosResponse = await axiosInstance({
      method: config.method,
      url: config.url,
      data: config.data,
      params: config.params,
    });

    // Zod 스키마 검증
    const result = schema.safeParse(response.data);

    if (!result.success) {
      console.error('API 응답 검증 실패:', {
        url: config.url,
        method: config.method,
        errors: result.error.issues,
      });
      throw new Error('서버 응답 형식이 올바르지 않습니다');
    }

    return result.data;
  } catch (error) {
    //  422 에러는 validation response로 처리
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      const result = schema.safeParse(error.response.data);

      if (!result.success) {
        console.error('422 응답 검증 실패:', {
          url: config.url,
          method: config.method,
          errors: result.error.issues,
        });
        throw error;
      }

      return result.data;
    }

    if (error instanceof Error && error.message.includes('서버 응답')) {
      throw error;
    }

    throw error;
  }
}

/**
 * HTTP 메서드별 편의 함수들
 */
export const api = {
  /**
   * GET 요청
   */
  get: <TResponse>(url: string, schema: z.ZodType<TResponse>, params?: Record<string, unknown>) =>
    apiRequest<TResponse>({ method: 'get', url, params }, schema),

  /**
   * POST 요청
   */
  post: <TRequest = unknown, TResponse = unknown>(
    url: string,
    data: TRequest,
    schema: z.ZodType<TResponse>,
  ) => apiRequest<TResponse>({ method: 'post', url, data }, schema),

  /**
   * PUT 요청
   */
  put: <TRequest = unknown, TResponse = unknown>(
    url: string,
    data: TRequest,
    schema: z.ZodType<TResponse>,
  ) => apiRequest<TResponse>({ method: 'put', url, data }, schema),

  /**
   * PATCH 요청
   */
  patch: <TRequest = unknown, TResponse = unknown>(
    url: string,
    data: TRequest,
    schema: z.ZodType<TResponse>,
  ) => apiRequest<TResponse>({ method: 'patch', url, data }, schema),

  /**
   * DELETE 요청
   */
  delete: <TResponse>(url: string, schema: z.ZodType<TResponse>) =>
    apiRequest<TResponse>({ method: 'delete', url }, schema),
};
