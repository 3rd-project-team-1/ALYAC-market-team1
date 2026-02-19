import React from "react";

type ButtonVariant = "primary" | "disabled" | "active";
type ButtonSize = "l" | "m" | "ms" | "s";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-[#11CC27] text-white hover:brightness-110 active:scale-[0.97]",
    disabled: "bg-[#B3F5BB] text-white cursor-not-allowed pointer-events-none",
    active: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-[0.97]",
};

const sizeStyles: Record<ButtonSize, string> = {
    l: "w-[322px] h-[44px] text-[15px] font-bold",
    m: "h-[38px] px-7 text-[14px] font-bold",
    ms: "h-[38px] px-5 text-[14px] font-bold",
    s: "h-[32px] px-4 text-[13px] font-bold",
};

export const Button = ({
    variant = "primary",
    size = "m",
    children,
    disabled,
    className = "",
    onClick,
    ...props
}: ButtonProps) => {
    const resolvedVariant: ButtonVariant =
        disabled ? "disabled" : variant;

    return (
        <button
            disabled={resolvedVariant === "disabled"}
            onClick={onClick}
            className={[
                "inline-flex items-center justify-center rounded-full transition-all duration-150",
                sizeStyles[size],
                variantStyles[resolvedVariant],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </button>
    );
};

// 미리 만들어둔 버튼들
export const NextButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <Button size="l" variant="primary" onClick={onClick}>다음</Button>
);

export const NextButtonDisabled = () => (
    <Button size="l" disabled>다음</Button>
);

export const FollowButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <Button size="m" variant="primary" onClick={onClick}>팔로우</Button>
);

export const FollowButtonDisabled = () => (
    <Button size="m" disabled>팔로우</Button>
);

export const UnfollowButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <Button size="m" variant="active" onClick={onClick}>언팔로우</Button>
);

export const SaveButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <Button size="ms" variant="primary" onClick={onClick}>저장</Button>
);

export const SaveButtonDisabled = () => (
    <Button size="ms" disabled>저장</Button>
);

export const SmallFollowButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <Button size="s" variant="primary" onClick={onClick}>팔로우</Button>
);

export const CancelButton = ({ onClick }: { onClick?: React.MouseEventHandler<HTMLButtonElement> }) => (
    <Button size="s" variant="active" onClick={onClick}>취소</Button>
);