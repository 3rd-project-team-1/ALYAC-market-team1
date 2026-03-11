import { Navigate, Outlet } from 'react-router-dom';

import { LoadingSpinner } from '@/shared/ui';

import { useTokenVerification } from '../hooks/useTokenVerification';

/**
 * 인증된 사용자만 접근 가능한 라우트 가드
 * 토큰이 없거나 유효하지 않으면 홈으로 리다이렉트
 */
export function RequireAuth() {
  const { token, isVerifying, isValid } = useTokenVerification();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isVerifying) {
    return <LoadingSpinner fullScreen message="권한 확인 중..." />;
  }

  return isValid ? <Outlet /> : <Navigate to="/" replace />;
}
