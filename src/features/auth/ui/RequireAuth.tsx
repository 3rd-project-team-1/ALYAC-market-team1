import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '@/entities/auth/lib/token';

export function RequireAuth() {
  const token = getToken();

  // 토큰이 없으면 로그인 페이지로 쫓아냄
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // 로그인했으면 그 안의 페이지들(Outlet)을 싹 다 보여줌!
  return <Outlet />;
}
