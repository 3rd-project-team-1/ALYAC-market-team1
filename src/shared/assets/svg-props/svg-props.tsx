interface IconProps {
    size?: number;
    color?: string;
    className?: string;
    active?: boolean;
}

/* upload file·image */
export const UploadFile = ({ size = 50, color = 'currentColor', ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="25" cy="25" r="25" fill="#11CC27" />
        <path d="M33.1667 14.5H16.8333C15.5447 14.5 14.5 15.5447 14.5 16.8333V33.1667C14.5 34.4553 15.5447 35.5 16.8333 35.5H33.1667C34.4553 35.5 35.5 34.4553 35.5 33.1667V16.8333C35.5 15.5447 34.4553 14.5 33.1667 14.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.9167 22.6667C21.8832 22.6667 22.6667 21.8832 22.6667 20.9167C22.6667 19.9502 21.8832 19.1667 20.9167 19.1667C19.9502 19.1667 19.1667 19.9502 19.1667 20.9167C19.1667 21.8832 19.9502 22.6667 20.9167 22.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35.4999 28.5L29.6666 22.6667L16.8333 35.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ImgButton = ({ size = 36, color = 'currentColor', ...props }: IconProps) => (
    <svg width={size} height={size} fill={color} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="18" cy="18" r="18" fill="#C4C4C4" />
        <path d="M24.4167 9.75H11.5833C10.5708 9.75 9.75 10.5708 9.75 11.5833V24.4167C9.75 25.4292 10.5708 26.25 11.5833 26.25H24.4167C25.4292 26.25 26.25 25.4292 26.25 24.4167V11.5833C26.25 10.5708 25.4292 9.75 24.4167 9.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.7917 16.1667C15.5511 16.1667 16.1667 15.551 16.1667 14.7917C16.1667 14.0323 15.5511 13.4167 14.7917 13.4167C14.0324 13.4167 13.4167 14.0323 13.4167 14.7917C13.4167 15.551 14.0324 16.1667 14.7917 16.1667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26.2499 20.75L21.6666 16.1667L11.5833 26.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

//TODO: 강사님께 물어보고 사용하기
export const UploadImage = ({ size = 42, className }: Pick<IconProps, 'size' | 'className'>) => (
    <svg width={size} height={size} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="55" cy="55" r="54.5" fill="#DBDBDB" stroke="#D4D4D4" />
        <circle cx="55" cy="43" r="14" fill="white" />
        <rect x="35" y="62" width="40" height="34" rx="20" fill="white" />
    </svg>
);

/* tab menu */
export const HomeIcon = ({ active }: Pick<IconProps, 'active'>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21V12H15V21"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ChatIcon = ({ active }: Pick<IconProps, 'active'>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 9.58336C17.5029 10.6832 17.2459 11.7683 16.75 12.75C16.162 13.9265 15.2581 14.916 14.1395 15.6078C13.021 16.2995 11.7319 16.6662 10.4167 16.6667C9.31678 16.6696 8.23176 16.4126 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7683 3.33047 10.6832 3.33333 9.58336C3.33384 8.26815 3.70051 6.97907 4.39227 5.86048C5.08402 4.7419 6.07355 3.838 7.25 3.25002C8.23176 2.75413 9.31678 2.49716 10.4167 2.50002H10.8333C12.5703 2.59585 14.2109 3.32899 15.4409 4.55907C16.671 5.78915 17.4042 7.42973 17.5 9.16669V9.58336Z"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const WriteIcon = ({ active }: Pick<IconProps, 'active'>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="3"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" />
        <path d="M12 8V16"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 12L16 12"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const ProfileIcon = ({ active }: Pick<IconProps, 'active'>) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 22V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V22"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 22H20"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke={active ? "#11CC27" : "#767676"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);