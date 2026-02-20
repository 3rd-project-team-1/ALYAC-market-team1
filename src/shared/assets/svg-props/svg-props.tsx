interface IconProps {
    size?: number;
    color?: string;
    className?: string;
}

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

export const UploadImage = ({ size = 42, className }: Pick<IconProps, 'size' | 'className'>) => (
    <svg width={size} height={size} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="55" cy="55" r="54.5" fill="#DBDBDB" stroke="#D4D4D4" />
        <circle cx="55" cy="43" r="14" fill="white" />
        <rect x="35" y="62" width="40" height="34" rx="20" fill="white" />
    </svg>
);
