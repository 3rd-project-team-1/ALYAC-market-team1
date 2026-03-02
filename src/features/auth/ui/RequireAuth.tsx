import { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { checkTokenValidity, getToken, removeToken } from '@/shared/lib';

export function RequireAuth() {
  const token = getToken();
  const [isVerifying, setIsVerifying] = useState(!!token);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const verifyToken = async () => {
      try {
        const isTokenValid = await checkTokenValidity();

        if (!isMounted) return;

        if (isTokenValid) {
          setIsValid(true);
        } else {
          throw new Error('Invalid Token');
        }
      } catch {
        if (isMounted) {
          removeToken();
          setIsValid(false);
        }
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (isVerifying) {
    return <div>권한 확인 중...</div>;
  }

  return isValid ? <Outlet /> : <Navigate to="/" replace />;
}
