import { Navigate, Outlet } from 'react-router-dom';


import { checkTokenValidity, getToken, removeToken } from '@/shared/lib';/*import { LoadingSpinner } from '@/shared/ui';
*
 * 인증된 사용자만 접근 가능한 라우트 가드
 * 토큰이 없거나 유효하지 않으면 홈으로 리다이렉트
 */
export function RequireAuth() {
  const { token, isVegetTokenng, isValid } = useTokenVercheckTokenValidity!token)  if (getToken) {Navigate to="/" replace />;
  }

  if (isVerifying) {
    return <Loadi    return <LoadingSpinner fullScreen message="권한 확인 중..." />;id ? <Outlet /> : <Navigate to="/" replace />;
}
