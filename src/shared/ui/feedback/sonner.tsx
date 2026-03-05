import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { cn } from '@/shared/lib';
import { useTheme } from '@/shared/lib/theme';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      {...props}
      theme={theme as ToasterProps['theme']}
      className={cn('toaster group')}
      position="top-right"
      richColors
      expand={false}
      icons={{
        success: <CircleCheckIcon className={cn('size-4')} />,
        info: <InfoIcon className={cn('size-4')} />,
        warning: <TriangleAlertIcon className={cn('size-4')} />,
        error: <OctagonXIcon className={cn('size-4')} />,
        loading: <Loader2Icon className={cn('size-4 animate-spin')} />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
    />
  );
};

export { Toaster };
