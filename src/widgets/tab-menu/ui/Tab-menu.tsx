import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, ChatIcon, WriteIcon, ProfileIcon } from '@/shared/assets/svg-props/svg-props';

const tabs = [
    { path: ['/feed', '/search'], label: '홈', Icon: HomeIcon },
    { path: ['/chat'], label: '채팅', Icon: ChatIcon },
    { path: ['/create-post',], label: '게시물 작성', Icon: WriteIcon },
    { path: ['/profile',], label: '프로필', Icon: ProfileIcon },
];

export const TabMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="bg-background border-t border-border"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 8px 8px",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
            }}>
            {tabs.map(({ path, label, Icon }) => {
                const active = path.some(p => location.pathname.startsWith(p));
                return (
                    <button
                        key={path[0]}
                        onClick={() => navigate(path[0])}
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "2px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        <Icon active={active} />
                        <span style={{
                            fontSize: "10px",
                            color: active ? "#11CC27" : "#767676",
                            fontWeight: active ? 600 : 400,
                            whiteSpace: "nowrap",
                        }}>
                            {label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};