//타입확인! (V)
// API 통신 (V)
// 만들어야 할것들: 인터페이스 만들고, useForm 불러와서 기본값 세팅 ()
// onSubmit 함수 만들어서 useSignUp 훅으로 회원가입 요청 보내기 ()
// 회원가입 성공 시 로그인 페이지로 이동, 실패 시 에러 메시지 보여주기 ()
// UI는 FIGMA 참고해서 Form,Button,Input, Label 컴포넌트 활용해서 만들기 ()
// import { useNavigate } from 'react-router-dom';
// interface SignUpFormData {
//   email: string;
//   username: string;
//   accountname: string;
//   password: string;
//   passwordConfirm: string;
// }
// export function SignUpForm() {
//   const navigate = useNavigate();
//
// }
// --- 라이브러리 및 훅 불러오기 ---
// 페이지 이동을 도와주는 라우터 훅
import axios from 'axios';
import { useForm } from 'react-hook-form';
// 폼 상태 관리와 유효성 검사를 쉽게 해주는 라이브러리
import { useNavigate } from 'react-router-dom';

// API 통신 에러 처리를 위한 라이브러리
import { useSignUp } from '@/entities/auth/hooks/useSignup';
// 조건에 따라 CSS 클래스를 합쳐주는 유틸리티 함수

// --- 타입(Type) 불러오기 ---
// types.ts에서 완벽하게 정의해둔 API 요청/응답 타입을 가져옵니다.
import { ApiErrorResponse, SignupRequest } from '@/entities/user/types';
import { cn } from '@/shared/lib/utils';
// 우리가 만든 회원가입 API 통신 훅

// --- UI 컴포넌트 불러오기 ---
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

/**
 * 폼 내부에서 사용자가 입력하는 데이터의 모양을 정의합니다.
 * (주의: 서버로 보낼 때는 passwordConfirm은 빼고, user 객체로 감싸서 보내야 합니다.)
 */
interface SignUpFormData {
  email: string;
  username: string;
  accountname: string;
  password: string;
  passwordConfirm: string;
}

export function SignUpForm() {
  const navigate = useNavigate(); // 가입 성공 시 로그인 페이지로 넘기기 위해 사용
  const signUpMutation = useSignUp(); // 서버에 가입 데이터를 전송하는 '행동'이 담긴 객체

  // --- React Hook Form 설정 ---
  const {
    register, // 각 Input 창을 폼에 등록하고 검사 규칙을 부여하는 함수
    handleSubmit, // 폼이 제출될 때 실행할 함수를 감싸주는 역할 (유효성 검사 통과 시에만 실행됨)
    getValues, // 특정 Input 창에 입력된 값을 실시간으로 지켜보는 함수
    formState: { errors, isValid }, // errors: 에러 메시지 모음, isValid: 모든 조건이 충족되었는지 여부(true/false)
  } = useForm<SignUpFormData>({
    //  처음 화면이 켜졌을 때 입력창을 모두 빈칸으로 초기화
    defaultValues: {
      email: '',
      username: '',
      accountname: '',
      password: '',
      passwordConfirm: '',
    },
    //  입력할 때마다 실시간으로 에러가 있는지 검사합니다.
    mode: 'onChange',
  });

  // '비밀번호 확인' 유효성 검사를 위해, 현재 '비밀번호' 칸에 적힌 값을 실시간으로 가져옵니다.

  /**
   * 사용자가 '회원가입' 버튼을 누르고, 모든 입력 조건이 완벽할 때만 실행되는 함수입니다.
   * @param data 사용자가 폼에 입력한 데이터 (SignUpFormData 형태)
   */
  const onSubmit = (data: SignUpFormData) => {
    // 1. API 명세서(SignupRequest)에 정확히 맞게 데이터를 조립합니다.
    // (passwordConfirm은 폼 검사용이므로 제외하고, 필수 기본값인 intro와 image를 추가합니다.)
    const requestData: SignupRequest = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        accountname: data.accountname,
        intro: '안녕하세요! 반갑습니다.', // 필수값이므로 임의의 기본값 셋팅
        image: 'https://api.mandarin.weniv.co.kr/1687141773353.png', // 기본 프로필 이미지
      },
    };

    //  조립된 데이터를 서버로 발송
    signUpMutation.mutate(requestData, {
      // 통신 성공 시
      onSuccess: () => {
        alert('회원가입이 완료되었습니다! 로그인해 주세요.');
        navigate('/signin'); // 로그인 화면으로 튕겨줍니다.
      },
      // 통신 실패 시 (이미 있는 이메일이거나, 서버 에러 등)
      onError: (error) => {
        // Axios 통신 에러가 맞는지, 그리고 에러 응답이 ApiErrorResponse 형태가 맞는지 확인(타입 가드)
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          // 서버가 보내준 구체적인 에러 메시지
          const errorMessage =
            error.response?.data?.message || '회원가입에 실패했습니다. 입력 정보를 확인해 주세요.';
          alert(errorMessage);
        } else {
          // 인터넷 끊김 등 통신 외의 알 수 없는 에러 처리
          alert('알 수 없는 오류가 발생했습니다.');
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex w-full flex-col">
      {/* --- 이메일 입력 영역 --- */}
      <div className="mb-4">
        <Label htmlFor="email" className="text-[13px] font-normal text-gray-500">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: '이메일을 입력해 주세요.', // 필수 입력
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바른 이메일 형식을 입력해 주세요.', // 정규식을 이용한 이메일 모양 검사
            },
          })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.email ? 'border-red-500' : '',
          )}
        />
        {/* 에러 메시지가 존재하면 입력창 밑에 빨간 글씨로 보여줍니다. */}
        {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* --- 사용자 이름 입력 영역 --- */}
      <div className="mb-4">
        <Label htmlFor="username" className="text-[13px] font-normal text-gray-500">
          사용자 이름
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="2~10자 이내여야 합니다."
          {...register('username', {
            required: '사용자 이름을 입력해 주세요.',
            minLength: { value: 2, message: '2자 이상 입력해 주세요.' }, // 최소 길이 제한
            maxLength: { value: 10, message: '10자 이내로 입력해 주세요.' }, // 최대 길이 제한
          })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.username ? 'border-red-500' : '',
          )}
        />
        {errors.username && (
          <p className="mt-1.5 text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* --- 계정 ID 입력 영역 --- */}
      <div className="mb-4">
        <Label htmlFor="accountname" className="text-[13px] font-normal text-gray-500">
          계정 ID
        </Label>
        <Input
          id="accountname"
          type="text"
          placeholder="영문, 숫자, 밑줄, 마침표만 사용 가능"
          {...register('accountname', {
            required: '계정 ID를 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._]+$/,
              message: '영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.', // 특수문자 제한
            },
          })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.accountname ? 'border-red-500' : '',
          )}
        />
        {errors.accountname && (
          <p className="mt-1.5 text-xs text-red-500">{errors.accountname.message}</p>
        )}
      </div>

      {/* --- 비밀번호 입력 영역 --- */}
      <div className="mb-4">
        <Label htmlFor="password" className="text-[13px] font-normal text-gray-500">
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password', {
            required: '비밀번호를 입력해 주세요.',
            minLength: { value: 6, message: '최소 6자 이상이어야 합니다.' },
          })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.password ? 'border-red-500' : '',
          )}
        />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* --- 비밀번호 확인 입력 영역 --- */}
      <div className="mb-8">
        <Label htmlFor="passwordConfirm" className="text-[13px] font-normal text-gray-500">
          비밀번호 확인
        </Label>
        <Input
          id="passwordConfirm"
          type="password"
          {...register('passwordConfirm', {
            required: '비밀번호를 한 번 더 입력해 주세요.',
            // 커스텀 검사 규칙: 위에서 watch로 지켜보고 있는 password 값과 현재 입력값이 똑같은지 비교합니다.
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          })}
          className={cn(
            'mt-1 h-auto rounded-none border-b border-gray-300 bg-transparent px-0 py-2 text-base shadow-none transition-colors focus-visible:border-[#6BCB26] focus-visible:ring-0',
            errors.passwordConfirm ? 'border-red-500' : '',
          )}
        />
        {errors.passwordConfirm && (
          <p className="mt-1.5 text-xs text-red-500">{errors.passwordConfirm.message}</p>
        )}
      </div>

      {/* --- 폼 제출(가입) 버튼 --- */}
      <Button
        type="submit"
        // 폼 조건이 하나라도 안 맞거나(!isValid), 현재 서버랑 통신 중(isPending)이면 버튼을 비활성화(클릭 방지)합니다.
        disabled={!isValid || signUpMutation.isPending}
        className={cn(
          'w-full rounded-full border-none py-6 text-base font-bold text-white shadow-none transition-colors',
          // isValid 상태에 따라 버튼 색상을 연두색(활성화) 또는 회색(비활성화)으로 바꿉니다.
          isValid
            ? 'bg-[#6BCB26] hover:bg-[#5CB020]'
            : 'cursor-not-allowed bg-[#D9D9D9] text-gray-400',
        )}
      >
        {/* 통신 중일 때는 텍스트를 바꿔서 사용자에게 처리 중임을 알려줍니다. */}
        {signUpMutation.isPending ? '처리 중...' : '회원가입'}
      </Button>
    </form>
  );
}
