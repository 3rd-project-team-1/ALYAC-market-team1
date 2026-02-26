import { FullLogoAlyacPngIcon } from '@/shared/assets';

export function SplashScreen() {
  return (
    <div className="animate-in fade-in zoom-in-95 flex flex-1 flex-col items-center justify-center pb-24 duration-1000">
      <FullLogoAlyacPngIcon className="h-55 w-50 object-contain" />
    </div>
  );
}
