import { ThemeProvider } from '@/shared/lib/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
