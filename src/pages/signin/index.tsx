import { useState } from 'react';

import { Link } from 'react-router-dom';

import { SignInForm } from '@/features/auth/ui/SignInForm';
import facebooklogo from '@/shared/assets/icons/facebook.svg';
import googlelogo from '@/shared/assets/icons/google.svg';
import kakaologo from '@/shared/assets/icons/kakao.svg';
import logoimg from '@/shared/assets/images/logo.png';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

// shadcn/ui 유틸

export function SignInPage() {
  // 화면 모드 상태 관리 ('selection': 초기 화면, 'email': 입력 폼 화면)
  const [viewMode, setViewMode] = useState<'selection' | 'email'>('selection');

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#1EC800]">
      {/* --- [1] 상단: 로고 영역 --- 
        조건부 렌더링: viewMode가 'selection'일 때만 보입니다.
        '이메일 로그인' 클릭 시 사라집니다.
      */}
      {viewMode === 'selection' && (
        <div className="animate-in fade-in zoom-in flex flex-1 items-center justify-center duration-500">
          <img src={logoimg} alt="ALYAC Market Logo" className="h-30 w-20 md:h-35 md:w-25" />
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#1EC800] opacity-50" />
        </div>
      )}

      {/* --- [2] 하단: 화이트 시트 영역 --- 
        viewMode에 따라 스타일이 동적으로 변합니다.
        - selection: 둥근 모서리, 하단 배치
        - email: 전체 화면 꽉 채움 (h-screen, rounded-none)
      */}
      <div
        className={cn(
          'flex w-full flex-col items-center bg-white transition-all duration-500 ease-in-out',
          viewMode === 'selection'
            ? 'rounded-t-[30px] px-8 pt-12 pb-16' // 초기 모습 (바텀 시트)
            : 'h-screen justify-center rounded-none px-8', // 폼 모습 (전체 화면)
        )}
      >
        {/* [A] 로그인 방식 선택 화면 */}
        {viewMode === 'selection' && (
          <div className="animate-in slide-in-from-bottom-10 fade-in flex w-full max-w-sm flex-col space-y-3 duration-500">
            <Button
              variant="outline"
              className="relative w-full rounded-full border-2 border-yellow-400 py-6 text-base text-[#3C1E1E] hover:bg-[#FDD835]"
            >
              <img src={kakaologo} alt="Kakao Logo" className="absolute left-6 h-5 w-5" />
              카카오톡 계정으로 로그인
            </Button>

            <Button
              variant="outline"
              className="relative w-full rounded-full border-gray-200 bg-white py-6 text-base text-gray-700 hover:bg-gray-50"
            >
              <img src={googlelogo} alt="Google Logo" className="absolute left-6 h-5 w-5" />
              구글 계정으로 로그인
            </Button>

            <Button
              variant="outline"
              className="relative w-full rounded-full border-2 border-blue-500 py-6 hover:bg-[#166FE5]"
            >
              <img src={facebooklogo} alt="Facebook Logo" className="absolute left-6 h-5 w-5" />
              페이스북 계정으로 로그인
            </Button>

            <div className="mt-8 flex items-center justify-center space-x-4 pt-4">
              {/* 클릭 시 setViewMode('email') 실행 -> 로고 사라짐 & 흰 배경 꽉 참 */}
              <button
                onClick={() => setViewMode('email')}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                이메일로 로그인
              </button>
              <span className="text-xs text-gray-300">|</span>
              <Link
                to="/signup"
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
              >
                회원가입
              </Link>
            </div>
          </div>
        )}

        {/* [B] 이메일 입력 폼 화면 (전체 화면 중앙 정렬) */}
        {viewMode === 'email' && (
          <div className="animate-in zoom-in-95 fade-in flex w-full max-w-sm flex-col duration-500">
            {/* 상단바: 뒤로가기 버튼 */}
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

            {/* 로그인 폼 컴포넌트 */}
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
    </div>
  );
}
