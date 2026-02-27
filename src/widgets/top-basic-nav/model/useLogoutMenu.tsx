import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { MonitorIcon, MoonIcon, SunIcon } from '@/shared/assets';
import { removeToken } from '@/shared/lib';
import { useTheme } from '@/shared/lib/theme';
import { LogoutModal } from '@/shared/ui/modal';

import { MoreMenu } from '../ui/MoreMenu';

interface UseLogoutMenuProps {
  onSettings?: () => void;
}

export function useLogoutMenu({ onSettings }: UseLogoutMenuProps = {}) {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const next = { light: 'dark', dark: 'system', system: 'light' } as const;
    setTheme(next[theme]);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/signin');
  };

  const themeLabel = {
    light: <SunIcon />,
    dark: <MoonIcon />,
    system: <MonitorIcon />,
  };

  const menuItems = [
    { label: '설정 및 개인정보', onClick: () => onSettings?.() },
    { label: <>테마: {themeLabel[theme]}</>, onClick: toggleTheme },
    { label: '로그아웃', onClick: () => setIsLogoutModalOpen(true) },
  ];

  const moreMenu = <MoreMenu items={menuItems} />;
  const modal = isLogoutModalOpen && (
    <LogoutModal
      title="로그아웃 하시겠습니까?"
      confirmText="로그아웃"
      cancelText="취소"
      onConfirm={() => {
        handleLogout();
        setIsLogoutModalOpen(false);
      }}
      onCancel={() => setIsLogoutModalOpen(false)}
    />
  );

  return { moreMenu, modal };
}
