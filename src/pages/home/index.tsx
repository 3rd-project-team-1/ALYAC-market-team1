import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import fulllogo from '@/shared/assets/images/full-logo.png';
import logoimg from '@/shared/assets/images/logo.png';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import { SocialLoginButton } from './ui/SocialLoginButtons';

const SPLASH_DURATION = 2000;
const SOCIAL_PROVIDERS = ['kakao', 'google', 'facebook'] as const;

function SplashScreen() {
  return (
    <div className="animate-in fade-in zoom-in-95 flex flex-1 flex-col items-center justify-center pb-24 duration-1000">
      <img
        src={fulllogo}
        alt="알약마켓 전체 로고"
        className="h-55 w-50 object-contain md:h-100 md:w-100"
      />
    </div>
  );
}

function SelectionScreen() {
  const navigate = useNavigate();

  return (
    <>
      <div className="animate-in fade-in flex flex-1 items-center justify-center duration-700">
        <img
          src={logoimg}
          alt="알약마켓 심볼 로고"
          className="h-38.25 w-24.25 object-contain md:h-60 md:w-50"
        />
      </div>
      <div className="animate-in slide-in-from-bottom-full flex h-[45vh] w-full flex-col items-center rounded-t-[30px] bg-white px-8 pt-12 pb-16 duration-700">
        <div className="animate-in fade-in flex w-full max-w-sm flex-col space-y-4 delay-300 duration-700">
          {SOCIAL_PROVIDERS.map((platform) => (
            <SocialLoginButton key={platform} platform={platform} />
          ))}
          <div className="mt-6 flex items-center justify-center space-x-4 pt-4 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/signin')}
              className="h-auto px-1.5 py-1.5 text-gray-500 hover:text-gray-900"
            >
              이메일로 로그인
            </Button>
            <span>|</span>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-auto px-1.5 py-1.5 text-gray-500 hover:text-gray-900"
            >
              <Link to="/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export function HomePage() {
  const [viewMode, setViewMode] = useState<'splash' | 'selection'>('splash');

  useEffect(() => {
    if (viewMode !== 'splash') return;

    const timer = setTimeout(() => {
      setViewMode('selection');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [viewMode]);

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col overflow-hidden transition-colors duration-700 ease-in-out',
        viewMode === 'splash' ? 'bg-white' : 'bg-[#1EC800]',
      )}
    >
      {viewMode === 'splash' ? <SplashScreen /> : <SelectionScreen />}
    </div>
  );
}
