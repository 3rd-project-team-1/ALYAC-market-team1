import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@/entities/auth/lib/token';

export function RequireGuest() {
  const token = getToken();

  // 토큰이 있으면(이미 로그인했으면) 피드 화면으로 돌려보냄
  if (token) {
    return <Navigate to="/feed" replace />;
  }

  // 로그인 안 했으면 폼 화면(Outlet) 보여줌!
  return <Outlet />;
}
