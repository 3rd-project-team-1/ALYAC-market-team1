import { ReactNode } from 'react';

interface UserInfoProps {
  username: string;
  accountname: string;
  children?: ReactNode;
}

export function UserInfo({ username, accountname, children }: UserInfoProps) {
  return (
    <div className="flex flex-1 flex-col gap-0.5">
      <p className="m-0 text-sm leading-snug font-semibold text-[#1a1a1a]">
        {children ?? username}
      </p>
      <p className="m-0 text-xs leading-snug text-[#888]">@ {accountname}</p>
    </div>
  );
}
