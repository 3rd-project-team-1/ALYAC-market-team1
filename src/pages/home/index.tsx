import { SelectionScreen, SplashScreen, useSplashTimer } from '@/features/home';
import { cn } from '@/shared/lib/utils/utils';

export function HomePage() {
  const viewMode = useSplashTimer();

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col overflow-hidden transition-colors duration-700 ease-in-out',
        viewMode === 'splash' ? 'bg-white' : 'bg-[#1EC800]',
      )}
    >
      {viewMode === 'splash' ? <SplashScreen /> : <SelectionScreen />}
    </div>
  );
}
