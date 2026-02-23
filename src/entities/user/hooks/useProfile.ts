import { useEffect, useState } from 'react';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';
import type { Profile } from '@/entities/user/types';

export function useProfile(accountname?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenInfo = getTokenUserInfo();
        // JWT 페이로드 필드명 확인 (서버마다 다를 수 있음)
        const myAccountname =
          tokenInfo?.accountname ?? tokenInfo?.account ?? tokenInfo?.id ?? null;

        if (accountname) {
          // URL에 accountname이 있으면 → 해당 유저 프로필 조회
          const res = await userApi.getProfile(accountname);
          setProfile(res.data.profile);
          // 내 accountname과 동일하면 내 프로필로 처리
          setIsMyProfile(!!myAccountname && myAccountname === accountname);
        } else {
          // URL에 accountname 없음 → /profile 경로 = 무조건 내 프로필
          if (myAccountname) {
            const res = await userApi.getProfile(myAccountname);
            setProfile(res.data.profile);
          }
          setIsMyProfile(true);
        }
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [accountname]);

  return { profile, isLoading, isMyProfile };
}
