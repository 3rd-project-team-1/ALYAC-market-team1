import React from "react";
import uploadImage from "@/assets/shared/icons/upload-image.svg";
import uploadImageSmall from "@/assets/shared/icons/upload-s-image.svg";
import uploadFile from "@/assets/shared/icons/upload-file.svg";
import imgButton from "@/assets/shared/icons/img-button.svg";

// 공통 타입
interface IconButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

// 업로드 이미지 컴포넌트

// 큰 프로필 업로드 (upload-l-image.svg)
export const UploadImageLargeBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[110px] h-[110px] rounded-full
            bg-[#DBDBDB] border border-[#D4D4D4]
            flex flex-col items-center justify-center gap-[10px]
            px-[35px] py-[20px]
            cursor-pointer hover:brightness-95 transition-all">
        <img src={uploadImage} alt="upload-image" />
    </div>
);

// 작은 프로필 업로드 (upload-s-image.svg)
export const UploadImageSmallBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[42px] h-[42px] rounded-[55px]
            bg-[#DBDBDB] border border-[#D4D4D4]
            flex flex-col items-center justify-center gap-[10px]
            px-[12px] py-[5px]
            cursor-pointer hover:brightness-95 transition-all">
        <img src={uploadImageSmall} alt="upload-small-image" />
    </div>
);

// 파일 업로드 버튼 (upload-file)
export const UploadFileBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (

    <div
        onClick={onClick}
        className="w-[50px] h-[50px] rounded-full
            bg-[#11CC27]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={uploadFile} alt="upload-file" />
    </div>
);

// 이미지 버튼 (img-button)
export const ImageBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[36px] h-[36px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={imgButton} alt="img-button" />
    </div>
);

// ─── 아이콘 버튼 (공통 래퍼) ──────────────────────────────────────────
const IconBtn = ({ onClick, className = "", children }: IconButtonProps & { children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center justify-center w-[44px] h-[44px] rounded-full transition-colors hover:bg-gray-100 active:scale-95 ${className}`}
    >
        {children}
    </button>
);

// ─── 내비게이션 아이콘 버튼들 ─────────────────────────────────────────

// 검색
export const SearchButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#222" strokeWidth="1.8" />
            <path d="M16.5 16.5L21 21" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    </IconBtn>
);

// 더보기 (세로 점 3개)
export const MoreVerticalButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1.5" fill="#222" />
            <circle cx="12" cy="12" r="1.5" fill="#222" />
            <circle cx="12" cy="19" r="1.5" fill="#222" />
        </svg>
    </IconBtn>
);

// 뒤로가기
export const BackButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M11 6l-6 6 6 6" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 더보기 (가로 점 3개)
export const MoreHorizontalButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="1.5" fill="#222" />
            <circle cx="12" cy="12" r="1.5" fill="#222" />
            <circle cx="19" cy="12" r="1.5" fill="#222" />
        </svg>
    </IconBtn>
);

// 이미지 (선택됨 - 보라 테두리)
export const ImageButton = (props: IconButtonProps) => (
    <IconBtn {...props} className="border-2 border-purple-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#888" strokeWidth="1.5" />
            <circle cx="8.5" cy="9.5" r="1.5" stroke="#888" strokeWidth="1.5" />
            <path d="M3 15l5-4 4 3 3-2 6 5" stroke="#888" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 리스트 뷰
export const ListViewButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="3" rx="1" fill="#333" />
            <rect x="3" y="11" width="18" height="3" rx="1" fill="#333" />
            <rect x="3" y="17" width="18" height="3" rx="1" fill="#333" />
        </svg>
    </IconBtn>
);

// 그리드 뷰
export const GridViewButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="1" fill="#333" />
            <rect x="13" y="3" width="8" height="8" rx="1" fill="#333" />
            <rect x="3" y="13" width="8" height="8" rx="1" fill="#333" />
            <rect x="13" y="13" width="8" height="8" rx="1" fill="#333" />
        </svg>
    </IconBtn>
);

// ─── 탭바 아이콘 (outline / filled) ──────────────────────────────────

// 홈 (outline)
export const HomeButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L12 4l9 8" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 홈 (filled/active)
export const HomeActiveButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12L12 4l9 8" stroke="#11CC27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" fill="#11CC27" stroke="#11CC27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 채팅 (outline)
export const ChatButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 채팅 (filled/active)
export const ChatActiveButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="#11CC27" stroke="#11CC27" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 추가/플러스
export const AddButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="#222" strokeWidth="1.8" />
            <path d="M12 8v8M8 12h8" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    </IconBtn>
);

// 프로필 (outline)
export const ProfileButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#222" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    </IconBtn>
);

// 프로필 (filled/active)
export const ProfileActiveButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="#11CC27" stroke="#11CC27" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#11CC27" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    </IconBtn>
);

// 복사/복제
export const CopyButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="12" height="12" rx="2" stroke="#222" strokeWidth="1.8" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    </IconBtn>
);

// 닫기/X
export const CloseButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    </IconBtn>
);

// ─── 액션 아이콘 ──────────────────────────────────────────────────────

// 좋아요 (하트)
export const LikeButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 댓글
export const CommentButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </IconBtn>
);

// 공유
export const ShareButton = (props: IconButtonProps) => (
    <IconBtn {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="#222" strokeWidth="1.8" />
            <circle cx="6" cy="12" r="3" stroke="#222" strokeWidth="1.8" />
            <circle cx="18" cy="19" r="3" stroke="#222" strokeWidth="1.8" />
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="#222" strokeWidth="1.8" />
        </svg>
    </IconBtn>
);

// ─── 브랜드 버튼 ──────────────────────────────────────────────────────

// 카카오
export const KakaoButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button
        onClick={onClick}
        className="w-[44px] h-[44px] rounded-full bg-[#FEE500] flex items-center justify-center hover:brightness-95 active:scale-95 transition-all"
    >
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 3.79 0 8.47c0 3.03 2.01 5.69 5.04 7.2l-1.28 4.76c-.11.41.37.73.71.47L9.9 17.7c.36.04.72.06 1.1.06 6.075 0 11-3.79 11-8.47S17.075 0 11 0z" fill="#3A1D1D" />
        </svg>
    </button>
);

// 구글
export const GoogleButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button
        onClick={onClick}
        className="w-[44px] h-[44px] rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
    >
        <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.16C6.51 42.62 14.62 48 24 48z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.49-1.47-.76-3.04-.76-4.59s.27-3.12.76-4.59l-7.98-6.16C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.75l7.97-6.16z" />
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.97 6.16C12.43 13.72 17.74 9.5 24 9.5z" />
        </svg>
    </button>
);

// 페이스북
export const FacebookButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <button
        onClick={onClick}
        className="w-[44px] h-[44px] rounded-full bg-[#1877F2] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
    >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
    </button>
);