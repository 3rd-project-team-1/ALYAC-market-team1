import { Navigate, Outlet } from 'react-router-dom';

import { useTokenVerification } from '../lib/use-token-verification';

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
    return <div>로딩 중...</div>;
  }

  return isValid ? <Navigate to="/feed" replace /> : <Outlet />;
}
