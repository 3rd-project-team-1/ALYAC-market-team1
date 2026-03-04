import { FacebookIcon, GoogleIcon, KakaoIcon } from '@/shared/assets';
import { cn } from '@/shared/lib/utils/utils';
import { Button } from '@/shared/ui/button/button';

interface SocialLoginButtonProps {
  platform: 'google' | 'kakao' | 'facebook';
}

const logoMap = {
  kakao: { Icon: KakaoIcon, label: '카카오톡 계정으로 로그인', borderClass: 'border-[#FBD914]' },
  google: { Icon: GoogleIcon, label: '구글 계정으로 로그인', borderClass: 'border-gray-400' },
  facebook: {
    Icon: FacebookIcon,
    label: '페이스북 계정으로 로그인',
    borderClass: 'border-[#1877F2]',
  },
};

export function SocialLoginButton({ platform }: SocialLoginButtonProps) {
  const { Icon, label, borderClass } = logoMap[platform];
  return (
    <Button
      disabled
      variant="outline"
      className={cn(
        'relative w-full rounded-full bg-white py-6 text-base text-gray-600 hover:bg-gray-50',
        borderClass,
      )}
    >
      <Icon className="absolute left-6 h-5 w-5" />
      {label}
    </Button>
  );
}
