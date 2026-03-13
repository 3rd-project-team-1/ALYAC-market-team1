import { cn } from '@/shared/lib';

import type { IconProps } from './types';

export const PostListIcon = ({ active }: Pick<IconProps, 'active'>) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="1" y="0.5" width="18" height="4"
      rx="2"
      fill="currentColor"
      className={cn(active ? 'opacity-100' : 'opacity-35')}
    />
    <rect
      x="1" y="8" width="18" height="4"
      rx="2"
      fill="currentColor"
      className={cn(active ? 'opacity-100' : 'opacity-35')}
    />
    <rect
      x="1" y="15.5" width="18" height="4"
      rx="2"
      fill="currentColor"
      className={cn(active ? 'opacity-100' : 'opacity-35')}
    />
  </svg>
);
