import { createContext, useEffect, useState } from 'react';

import type { Theme, ThemeContextType } from '@/shared/lib/theme/types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const userId = localStorage.getItem('lastUserId');
  const storageKey = userId ? `theme_${userId}` : 'theme';

  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    const currentUserId = localStorage.getItem('lastUserId');
    const key = currentUserId ? `theme_${currentUserId}` : 'theme';
    localStorage.setItem(key, newTheme);
    setThemeState(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
