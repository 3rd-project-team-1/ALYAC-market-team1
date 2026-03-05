import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { User } from '@/entities/user';
import { API_ENDPOINT, axiosInstance } from '@/shared/api';
import { getToken, removeToken } from '@/shared/lib';

const getCurrentUser = async (): Promise<User> => {
  const { data } = await axiosInstance.get(API_ENDPOINT.USER_ME);
  return data;
};

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const hasToken = !!getToken();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const logout = () => {
    removeToken();
    localStorage.removeItem('lastUserId');
    queryClient.clear();
    navigate('/signin');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: hasToken && isLoading,
    logout,
  };
}
