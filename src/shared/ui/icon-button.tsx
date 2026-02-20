import React from "react";
import uploadImage from "@/assets/shared/icons/upload-image.svg";
import uploadImageSmall from "@/assets/shared/icons/upload-s-image.svg";
import uploadFile from "@/assets/shared/icons/upload-file.svg";
import imgButton from "@/assets/shared/icons/img-button.svg";
import search from "@/assets/shared/icons/search.svg";
import moreVertical from "@/assets/shared/icons/more-vertical.svg";
import moreVerticalSmall from "@/assets/shared/icons/more-s-vertical.svg";
import arrowLeft from "@/assets/shared/icons/arrow-left.svg";
import iconImage from "@/assets/shared/icons/icon-image.svg";
import postListOn from "@/assets/shared/icons/post-list-on.svg";
import postListOff from "@/assets/shared/icons/post-list-off.svg";
import postAlbumOn from "@/assets/shared/icons/post-album-on.svg";
import postAlbumOff from "@/assets/shared/icons/post-album-off.svg";
import homeFill from "@/assets/shared/icons/home-fill.svg";
import home from "@/assets/shared/icons/home.svg";
import messageCircleFill from "@/assets/shared/icons/message-circle-fill.svg";
import messageCircle from "@/assets/shared/icons/message-circle.svg";
import edit from "@/assets/shared/icons/edit.svg";
import userFill from "@/assets/shared/icons/user-fill.svg";
import user from "@/assets/shared/icons/user.svg";
import imgLayers from "@/assets/shared/icons/img-layers.svg";
import close from "@/assets/shared/icons/close.svg";

/* 공통 타입 */
interface IconButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

/* ---------------------- 업로드 컴포넌트 ---------------------- */

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

/* ---------------------- 내비게이션 아이콘 버튼들 ---------------------- */

// 검색 버튼 (icon-search)
export const SearchBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={search} alt="search" />
    </div>
);

// 더보기 버튼 (more-vertical)
export const MoreVerticalBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={moreVertical} alt="more-vertical" />
    </div>
);

// 작고 연한 더보기 버튼 (more-s-vertical)
export const MoreVerticalSmallBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[18px] h-[18px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={moreVerticalSmall} alt="more-s-vertical" />
    </div>
);

// 뒤로가기 버튼 (arrow-left)
export const BackButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[22px] h-[22px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={arrowLeft} alt="arrow-left" />
    </div>
);

// 이미지 아이콘 버튼 (icon-image)
export const IconImageBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[22px] h-[22px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={iconImage} alt="image" />
    </div>
);

// 리스트 뷰 버튼 (post-list-on)
export const ListViewButtonOn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[26px] h-[26px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={postListOn} alt="post-list-on" />
    </div>
);

// 연한 리스트 뷰 버튼 (post-list-off)
export const ListViewButtonOff = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[26px] h-[26px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={postListOff} alt="post-list-off" />
    </div>
);

// 그리드 뷰 버튼 (post-album-on)
export const GridViewButtonOn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[26px] h-[26px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={postAlbumOn} alt="post-album-on" />
    </div>
);

// 연한 그리드 뷰 버튼 (post-album-off)
export const GridViewButtonOff = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[26px] h-[26px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={postAlbumOff} alt="post-album-off" />
    </div>
);

/* 탭바 아이콘 */

// 홈 버튼 (home-fill)
export const IconHomeFillBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={homeFill} alt="home-fill" />
    </div>
);

// 홈 버튼 [active] (home)
export const IconHomeBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={home} alt="home" />
    </div>
);

// 채팅 버튼 (message-circle-fill)
export const IconMessageCircleFillBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={messageCircleFill} alt="message-circle-fill" />
    </div>
);

// 채팅 버튼 [active] (message-circle)
export const IconMessageCircleBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={messageCircle} alt="message-circle" />
    </div>
);

// 추가/플러스 버튼 (edit)
export const IconEditBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={edit} alt="edit" />
    </div>
);

// 프로필 버튼(user-fill)
export const IconUserFillBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={userFill} alt="user-fill" />
    </div>
);

// 프로필 버튼 [active] (user)
export const IconUserBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[24px] h-[24px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={user} alt="user" />
    </div>
);

// 복사/복제 버튼 (img-layers)
export const IconImgLayersBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[20px] h-[20px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={imgLayers} alt="img-layers" />
    </div>
);

// 닫기 버튼 (close)
export const IconCloseBtn = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLDivElement> }) => (
    <div
        onClick={onClick}
        className="w-[22px] h-[22px]
            flex items-center justify-center
            cursor-pointer hover:brightness-95 transition-all">
        <img src={close} alt="close" />
    </div>
);

/* -------------- TODO: 여기부터 다시 수정하기 -------------- */

/* ---------------------- 액션 아이콘 ---------------------- */

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

// ─── 아이콘 버튼 (공통 래퍼) ──────────────────────────────────────────
const IconBtn = ({ onClick, className = "", children }: IconButtonProps & { children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center justify-center w-[44px] h-[44px] rounded-full transition-colors hover:bg-gray-100 active:scale-95 ${className}`}
    >
        {children}
    </button>
);