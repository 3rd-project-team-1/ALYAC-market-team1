import { Link } from 'react-router-dom';

import { FullLogoAlyacNoTextIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { Button } from '@/shared/ui';

import { SocialLoginButton } from './SocialLoginButtons';

const SOCIAL_PROVIDERS = ['kakao', 'google', 'facebook'] as const;

export function SelectionScreen() {
  return (
    <>
      <div
        className={cn('animate-in fade-in flex flex-1 items-center justify-center duration-700')}
      >
        <FullLogoAlyacNoTextIcon className={cn('h-38.25 w-24.25 object-contain')} />
      </div>
      <div
        className={cn(
          'animate-in slide-in-from-bottom-full flex h-[45vh] w-full flex-col items-center rounded-t-[30px] bg-white px-8 pt-12 pb-16 duration-700',
        )}
      >
        <div
          className={cn(
            'animate-in fade-in flex w-full max-w-sm flex-col space-y-4 delay-300 duration-700',
          )}
        >
          {SOCIAL_PROVIDERS.map((platform) => (
            <SocialLoginButton key={platform} platform={platform} />
          ))}
          <div className={cn('mt-6 flex items-center justify-center space-x-4 pt-4 text-sm')}>
            <Button
              variant="ghost"
              size="sm"
              className={cn('h-auto px-1.5 py-1.5 text-gray-500 hover:text-gray-900')}
            >
              <Link to={ROUTE_PATHS.SIGNIN}>이메일로 로그인</Link>
            </Button>
            <span>|</span>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn('h-auto px-1.5 py-1.5 text-gray-500 hover:text-gray-900')}
            >
              <Link to={ROUTE_PATHS.SIGNUP}>회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
