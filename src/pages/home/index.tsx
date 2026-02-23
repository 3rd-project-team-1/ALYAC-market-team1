import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import facebooklogo from '@/shared/assets/icons/facebook.svg';
import googlelogo from '@/shared/assets/icons/google.svg';
import kakaologo from '@/shared/assets/icons/kakao.svg';
import fulllogo from '@/shared/assets/images/full-logo.png';
import logoimg from '@/shared/assets/images/logo.png';
import { cn } from '@/shared/lib/utils';

import { SocialLoginButton } from './ui/SocialLoginButtons';

export function HomePage() {
  const [viewMode, setViewMode] = useState<'splash' | 'selection'>('splash');
  const navigate = useNavigate();

  useEffect(() => {
    if (viewMode === 'splash') {
      const timer = setTimeout(() => {
        setViewMode('selection');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col overflow-hidden transition-colors duration-700 ease-in-out',
        viewMode === 'splash' ? 'bg-white' : 'bg-[#1EC800]',
      )}
    >
      {/* 스플래시 화면 */}
      {viewMode === 'splash' && (
        <div className="animate-in fade-in zoom-in-95 flex flex-1 flex-col items-center justify-center pb-24 duration-1000">
          <img
            src={fulllogo}
            alt="알약마켓 로고"
            className="h-55 w-50 object-contain md:h-100 md:w-100"
          />
        </div>
      )}

      {/* 로고 영역 */}
      {viewMode === 'selection' && (
        <div className="animate-in fade-in flex flex-1 items-center justify-center duration-700">
          <img
            src={logoimg}
            alt="앱 로고"
            className="h-38.25 w-24.25 object-contain md:h-60 md:w-50"
          />
        </div>
      )}

      {/* 하단 화이트 시트 */}
      {viewMode === 'selection' && (
        <div className="animate-in slide-in-from-bottom-full flex h-[60vh] w-full flex-col items-center rounded-t-[30px] bg-white px-8 pt-12 pb-16 duration-700">
          <div className="animate-in fade-in flex w-full max-w-sm flex-col space-y-4 delay-300 duration-700">
            <SocialLoginButton
              logo={googlelogo}
              alt="구글 로고"
              label="구글 계정으로 로그인"
              borderClass="border-gray-400"
            />
            <SocialLoginButton
              logo={kakaologo}
              alt="카카오 로고"
              label="카카오톡 계정으로 로그인"
              borderClass="border-[#FBD914]"
            />
            <SocialLoginButton
              logo={facebooklogo}
              alt="페이스북 로고"
              label="페이스북 계정으로 로그인"
              borderClass="border-[#1877F2]"
            />

            <div className="mt-6 flex items-center justify-center space-x-4 pt-4 text-sm">
              <button
                onClick={() => navigate('/signin')}
                className="text-gray-500 transition-colors hover:text-gray-900"
              >
                이메일로 로그인
              </button>
              <span className="text-xs text-gray-300">|</span>
              <Link to="/signup" className="text-gray-500 transition-colors hover:text-gray-900">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
