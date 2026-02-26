import { useLocation, useNavigate } from 'react-router-dom';

import { ChatIcon, HomeIcon, ProfileIcon, WriteIcon } from '@/shared/assets/svg-props/svg-props';

const tabs = [
  { path: ['/feed', '/search'], label: '홈', Icon: HomeIcon },
  { path: ['/chat'], label: '채팅', Icon: ChatIcon },
  { path: ['/post-create'], label: '게시물 작성', Icon: WriteIcon },
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
            className={`group flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#11CC27]/10`}
          >
            <Icon active={active} />
            <span
              className={`text-[10px] whitespace-nowrap transition-colors group-hover:font-semibold group-hover:text-[#11CC27] ${
                active ? 'font-semibold text-[#11CC27]' : 'font-normal text-[#767676]'
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
