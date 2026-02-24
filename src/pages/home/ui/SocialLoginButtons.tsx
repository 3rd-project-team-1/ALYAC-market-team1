import facebooklogo from '@/shared/assets/icons/facebook.svg';
import googlelogo from '@/shared/assets/icons/google.svg';
import kakaologo from '@/shared/assets/icons/kakao.svg';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface SocialLoginButtonProps {
  platform: 'google' | 'kakao' | 'facebook';
}

const logoMap = {
  kakao: { icon: kakaologo, label: '카카오톡 계정으로 로그인', borderClass: 'border-[#FBD914]' },
  google: { icon: googlelogo, label: '구글 계정으로 로그인', borderClass: 'border-gray-400' },
  facebook: {
    icon: facebooklogo,
    label: '페이스북 계정으로 로그인',
    borderClass: 'border-[#1877F2]',
  },
};

export function SocialLoginButton({ platform }: SocialLoginButtonProps) {
  const { icon: logo, label, borderClass } = logoMap[platform];
  return (
    <Button
      disabled
      variant="outline"
      className={cn(
        'relative w-full rounded-full bg-white py-6 text-base text-gray-600 hover:bg-gray-50',
        borderClass,
      )}
    >
      <img src={logo} alt={label} className="absolute left-6 h-5 w-5" />
      {label}
    </Button>
  );
}
