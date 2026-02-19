import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { SignInForm } from '@/features/auth/ui/SignInForm';
import facebooklogo from '@/shared/assets/icons/facebook.svg';
import googlelogo from '@/shared/assets/icons/google.svg';
import kakaologo from '@/shared/assets/icons/kakao.svg';
import fulllogo from '@/shared/assets/images/full-logo.png';
import logoimg from '@/shared/assets/images/logo.png';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

// shadcn/ui 유틸

export function SignInPage() {
  // 화면 모드 상태 관리 ('selection': 초기 화면, 'email': 입력 폼 화면)
  const [viewMode, setViewMode] = useState<'splash' | 'selection' | 'email'>('splash');
  useEffect(() => {
    if (viewMode === 'splash') {
      const timer = setTimeout(() => {
        setViewMode('selection');
      }, 2000);
      return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 정리
    }
  }, [viewMode]);
  return (
    <div
      //  splash일 때는 흰색, 그 외에는 초록색 배경으로
      className={cn(
        'flex min-h-screen flex-col overflow-hidden transition-colors duration-700 ease-in-out',
        viewMode === 'splash' ? 'bg-white' : 'bg-[#1EC800]',
      )}
    >
      {/* --- 스플래시 화면 (viewMode === 'splash') --- */}
      {viewMode === 'splash' && (
        <div className="animate-in fade-in zoom-in-95 flex flex-1 flex-col items-center justify-center pb-24 duration-1000">
          <img
            src={fulllogo}
            alt="알약마켓 로고"
            className="h-55 w-50 object-contain md:h-100 md:w-100"
          />
        </div>
      )}

      {/* --- 상단: 로고 영역 (viewMode === 'selection') --- */}
      {viewMode === 'selection' && (
        <div className="animate-in fade-in flex flex-1 items-center justify-center duration-700">
          <img
            src={logoimg}
            alt="앱 로고"
            className="h-38.25 w-24.25 object-contain md:h-60 md:w-50"
          />
        </div>
      )}

      {/* --- 하단: 화이트 시트 영역 (splash가 아닐 때만 하단에서 스르륵 올라옴) --- */}
      {viewMode !== 'splash' && (
        <div
          className={cn(
            'flex w-full flex-col items-center bg-white transition-all duration-500 ease-in-out',
            viewMode === 'selection'
              ? 'animate-in slide-in-from-bottom-full h-[50vh] rounded-t-[30px] px-8 pt-12 pb-16 duration-700'
              : 'h-screen justify-center rounded-none px-8', // 이메일 폼일 땐 화면 가득 참
          )}
        >
          {/* [C-1] 로그인 방식 선택 화면 (사진 속 UI와 똑같이 테두리 버튼으로 수정!) */}
          {viewMode === 'selection' && (
            <div className="animate-in fade-in flex w-full max-w-sm flex-col space-y-4 delay-300 duration-700">
              <Button
                variant="outline"
                className="relative w-full rounded-full border-[#FBD914] bg-white py-6 text-base text-gray-600 hover:bg-gray-50"
              >
                <img src={kakaologo} alt="Kakao Logo" className="absolute left-6 h-5 w-5" />
                카카오톡 계정으로 로그인
              </Button>

              <Button
                variant="outline"
                className="relative w-full rounded-full border-gray-400 bg-white py-6 text-base text-gray-600 hover:bg-gray-50"
              >
                <img src={googlelogo} alt="Google Logo" className="absolute left-6 h-5 w-5" />
                구글 계정으로 로그인
              </Button>

              <Button
                variant="outline"
                className="relative w-full rounded-full border-[#1877F2] bg-white py-6 text-base text-gray-600 hover:bg-gray-50"
              >
                <img src={facebooklogo} alt="Facebook Logo" className="absolute left-6 h-5 w-5" />
                페이스북 계정으로 로그인
              </Button>

              <div className="mt-6 flex items-center justify-center space-x-4 pt-4 text-sm">
                <button
                  onClick={() => setViewMode('email')}
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
          )}

          {/* [C-2] 이메일 입력 폼 화면 */}
          {viewMode === 'email' && (
            <div className="animate-in zoom-in-95 fade-in flex w-full max-w-sm flex-col duration-500">
              <div className="mb-8">
                <button
                  onClick={() => setViewMode('selection')}
                  className="flex items-center text-sm text-gray-400 transition-colors hover:text-gray-800"
                >
                  ← 이전으로
                </button>
              </div>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
                <p className="mt-2 text-sm text-gray-500">이메일과 비밀번호를 입력해 주세요.</p>
              </div>

              <SignInForm />

              <div className="mt-8 text-center text-sm text-gray-500">
                아직 계정이 없으신가요?{' '}
                <Link to="/signup" className="font-bold text-[#1EC800] hover:underline">
                  회원가입
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
