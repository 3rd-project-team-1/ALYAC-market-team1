import { useEffect, useState } from 'react';

import { checkTokenValidity, getToken, removeToken } from '@/shared/lib';

/**
 * 토큰 검증 Hook
 * @returns 토큰 존재 여부, 검증 중 상태, 유효성 여부
 */
export function useTokenVerification() {
  const token = getToken();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

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

  return { token, isVerifying, isValid };
}
