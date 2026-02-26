import type { IconProps } from './types';

export const WriteIcon = ({ active }: Pick<IconProps, 'active'>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="3"
      stroke={active ? '#11CC27' : '#767676'}
      strokeWidth="2"
    />
    <path
      d="M12 8V16"
      stroke={active ? '#11CC27' : '#767676'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 12L16 12"
      stroke={active ? '#11CC27' : '#767676'}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
