import { Navigate, Outlet } from 'react-router-dom';

import { LoadingSpinner } from '@/shared/ui';

import { useTokenVerification } from '../hooks/useTokenVerification';

/**
 * 비인증 사용자만 접근 가능한 라우트 가드
 * 유효한 토큰이 있으면 피드로 리다이렉트
 */
export function RequireGuest() {
  const { token, isVerifying, isValid } = useTokenVerification();

  if (!token) {
    return <Outlet />;
  }

  if (isVerifying) {
    return <LoadingSpinner fullScreen message="로딩 중..." />;
  }

  return isValid ? <Navigate to="/feed" replace /> : <Outlet />;
}
