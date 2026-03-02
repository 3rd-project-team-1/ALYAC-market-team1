import { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { checkTokenValidity, getToken, removeToken } from '@/shared/lib';

export function RequireGuest() {
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
      } catch (error) {
        if (isMounted) {
          console.log(error);
          removeToken();
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
    return <Outlet />;
  }

  if (isVerifying) {
    return <div>로딩 중...</div>;
  }

  return isValid ? <Navigate to="/feed" replace /> : <Outlet />;
}
