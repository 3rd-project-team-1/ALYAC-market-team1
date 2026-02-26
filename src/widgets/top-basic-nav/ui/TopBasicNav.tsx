import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { removeToken } from '@/entities/auth/lib/token';
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
    light: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
    dark: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </svg>
    ),
    system: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  };

  return (
    <>
      <header className="bg-background border-border fixed top-0 right-0 left-0 flex h-[48px] items-center justify-between border-b px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-foreground flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-foreground flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.2" fill="currentColor" />
              <circle cx="12" cy="12" r="1.2" fill="currentColor" />
              <circle cx="12" cy="19" r="1.2" fill="currentColor" />
            </svg>
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
