import { useNavigate } from 'react-router-dom';

import { SignUpProfileForm } from '@/features/auth/ui/SignUpProfileForm';

export function SignUpProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-white px-8 pt-6 pb-16">
      <div className="animate-in slide-in-from-right-8 fade-in flex w-full max-w-sm flex-col duration-500">
        {/* 뒤로가기 버튼 (1단계 이메일 입력 화면으로) */}
        <div className="mb-6 flex w-full justify-start">
          <button
            onClick={() => navigate(-1)} // 바로 이전 페이지로 돌아갑니다.
            className="-ml-2 p-2 text-gray-400 transition-colors hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-[24px] font-bold text-gray-900">프로필 설정</h2>
          <p className="mt-2 text-sm text-gray-500">나중에 언제든지 변경할 수 있습니다.</p>
        </div>

        {/* 2단계 폼 렌더링 */}
        <SignUpProfileForm />
      </div>
    </div>
  );
}
