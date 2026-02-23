import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface SocialLoginButtonProps {
  logo: string;
  alt: string;
  label: string;
  borderClass: string;
}

export function SocialLoginButton({ logo, alt, label, borderClass }: SocialLoginButtonProps) {
  return (
    <Button
      disabled
      variant="outline"
      className={cn(
        'relative w-full rounded-full bg-white py-6 text-base text-gray-600 hover:bg-gray-50',
        borderClass,
      )}
    >
      <img src={logo} alt={alt} className="absolute left-6 h-5 w-5" />
      {label}
    </Button>
  );
}
