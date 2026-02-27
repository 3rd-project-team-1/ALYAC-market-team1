import { useLocation, useNavigate } from 'react-router-dom';

import { ChatIcon, EditIcon, HomeIcon, ProfileIcon } from '@/shared/assets';

const tabs = [
  { path: ['/feed', '/search'], label: '홈', Icon: HomeIcon },
  { path: ['/chat'], label: '채팅', Icon: ChatIcon },
  { path: ['/post-create'], label: '게시물 작성', Icon: EditIcon },
  { path: ['/profile'], label: '프로필', Icon: ProfileIcon },
];

export const TabMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-background border-border fixed right-0 bottom-0 left-0 flex items-center justify-between border-t px-2 py-2">
      {tabs.map(({ path, label, Icon }) => {
        const active = path.some((p) => location.pathname.startsWith(p));
        return (
          <button
            key={path[0]}
            onClick={() => navigate(path[0])}
            className={`group hover:bg-primary-green/10 flex flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 transition-colors`}
          >
            <Icon active={active} />
            <span
              className={`group-hover:text-primary-green text-[12px] whitespace-nowrap transition-colors group-hover:font-semibold ${
                active ? 'text-primary-green font-semibold' : 'text-muted-foreground font-normal'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
