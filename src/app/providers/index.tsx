import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';

import { queryClient } from '@/app/queryClient';
import { ThemeProvider } from '@/shared/lib/theme';
import { Toaster } from '@/shared/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system">
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
