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
        const myAccountname = tokenInfo?.accountname;

        if (accountname) {
          // 다른 유저 프로필 조회 GET /api/profile/:accountname
          const res = await userApi.getProfile(accountname);
          setProfile(res.data.profile);
          setIsMyProfile(myAccountname === accountname);
        } else if (myAccountname) {
          // 내 프로필 조회 GET /api/profile/:accountname (내 accountname으로)
          const res = await userApi.getProfile(myAccountname);
          setProfile(res.data.profile);
          setIsMyProfile(true);
        }
      } catch {
        // 에러 시 무시
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [accountname]);

  return { profile, isLoading, isMyProfile };
}
