import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { removeToken } from '@/entities/auth/lib/token';
import { BackIcon, MonitorIcon, MoonIcon, MoreIcon, SunIcon } from '@/shared/assets';
import { useTheme } from '@/shared/lib/theme';
import { LogoutModal } from '@/shared/ui/modal';

interface TopBasicNavProps {
  onSettings?: () => void;
}

export function TopBasicNav({ onSettings }: TopBasicNavProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <>
      <header className="bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-foreground flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-100"
        >
          <BackIcon />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-foreground flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-100"
          >
            <MoreIcon />
          </button>

          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="bg-background absolute top-10 right-0 z-20 w-44 overflow-hidden rounded-lg py-2 shadow-lg">
                <button
                  className="text-foreground hover:bg-accent w-full px-4 py-2.5 text-left text-sm"
                  onClick={() => {
                    onSettings?.();
                    setIsMenuOpen(false);
                  }}
                >
                  설정 및 개인정보
                </button>
                <button
                  className="text-foreground hover:bg-accent flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm"
                  onClick={toggleTheme}
                >
                  테마: {themeLabel[theme]}
                </button>
                <button
                  className="text-foreground hover:bg-accent w-full px-4 py-2.5 text-left text-sm"
                  onClick={() => {
                    setIsLogoutModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  로그아웃
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {isLogoutModalOpen && (
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
      )}
    </>
  );
}
