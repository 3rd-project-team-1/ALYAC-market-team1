import { useEffect, useState } from 'react';

const SPLASH_DURATION = 2000;

export function useSplashTimer() {
  const [viewMode, setViewMode] = useState<'splash' | 'selection'>('splash');

  useEffect(() => {
    if (viewMode !== 'splash') return;

    const timer = setTimeout(() => {
      setViewMode('selection');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [viewMode]);

  return viewMode;
}
