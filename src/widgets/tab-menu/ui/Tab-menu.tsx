import { useLocation, useNavigate } from 'react-router-dom';

import { ChatIcon, EditIcon, HomeIcon, ProfileIcon } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { ROUTE_PATHS } from '@/shared/routes';
import { IconButton } from '@/shared/ui';

const tabs = [
  { path: [ROUTE_PATHS.FEED, ROUTE_PATHS.SEARCH], label: '홈', Icon: HomeIcon },
  { path: [ROUTE_PATHS.CHAT], label: '채팅', Icon: ChatIcon },
  { path: [ROUTE_PATHS.CREATE_POST], label: '게시물 작성', Icon: EditIcon },
  { path: [ROUTE_PATHS.PROFILE], label: '프로필', Icon: ProfileIcon },
];

export const TabMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      aria-label="하단 메인 탭"
      className="bg-background border-border fixed right-0 bottom-0 left-0 flex items-center justify-between border-t px-2 py-2"
    >
      {tabs.map(({ path, label, Icon }) => {
        const active = path.some((p) => location.pathname.startsWith(p));
        return (
          <IconButton
            key={path[0]}
            label={label}
            active={active}
            Icon={Icon}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(path[0])}
            className="group hover:bg-primary-green flex-1 rounded-lg px-2 py-1.5"
            labelClassName={cn(
              'group-hover:text-primary-green group-hover:font-semibold',
              active ? 'text-primary-green font-semibold' : 'text-muted-foreground font-normal',
            )}
          />
        );
      })}
    </nav>
  );
};
