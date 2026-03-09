import { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { checkTokenValidity, getToken, removeToken } from '@/shared/lib';
import { LoadingSpinner } from '@/shared/ui';

export function RequireAuth() {
  const token = getToken();
  const [isVerifying, setIsVerifying] = useState(!!token);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const verifyToken = async () => {
      const isTokenValid = await checkTokenValidity();

      if (!isMounted) return;

      if (isTokenValid) {
        setIsValid(true);
      } else {
        removeToken();
        setIsValid(false);
      }

      setIsVerifying(false);
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
    return <LoadingSpinner fullScreen message="권한 확인 중..." />;
  }

  return isValid ? <Outlet /> : <Navigate to="/" replace />;
}
