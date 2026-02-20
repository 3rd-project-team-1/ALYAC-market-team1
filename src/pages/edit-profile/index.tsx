import { useEffect, useRef, useState } from 'react';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';
import type { User } from '@/entities/user/types';
import uploadFile from '@/shared/assets/icons/upload-file.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';

export function EditProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');
  const [accountname, setAccountname] = useState('');
  const [intro, setIntro] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenInfo = getTokenUserInfo();
        if (tokenInfo?.accountname) {
          const res = await userApi.getProfile(tokenInfo.accountname);
          const u: Omit<User, 'password'> = res.data.user;
          setUsername(u.username);
          setAccountname(u.accountname);
          setIntro(u.intro ?? '');
          setImagePreview(u.image ?? null);
        }
      } catch {
        // 에러 시 무시
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 프로필 이미지 */}
      <div className="flex justify-center py-8">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
            {imagePreview ? (
              <img src={imagePreview} alt="프로필 이미지" className="h-full w-full object-cover" />
            ) : (
              <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
            )}
          </div>
          {/* 이미지 아이콘 버튼 */}
          <button
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 transition-all hover:brightness-75"
            aria-label="이미지 변경"
          >
            <img src={uploadFile} alt="이미지 변경" width={28} height={28} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* 입력 폼 */}
      <div className="px-6 flex flex-col gap-6">
        {/* 사용자 이름 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-900">
            사용자 이름
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="이름을 입력하세요."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: username.length > 0 && username.length < 2 ? '#FF0000' : '#dbdbdb' }}
          />
          {username.length > 0 && username.length < 2 && (
            <p className="text-xs text-red-500">사용자 이름은 최소 2자 이상이어야 합니다.</p>
          )}
        </div>

        {/* 계정 ID */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-900">
            계정 ID
          </label>
          <input
            type="text"
            value={accountname}
            readOnly
            className="w-full border-b py-2 text-sm text-gray-900 outline-none"
            style={{ borderColor: '#dbdbdb' }}
          />
          <p className="text-xs text-gray-400">계정 ID는 변경할 수 없습니다.</p>
        </div>

        {/* 소개 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-900">
            소개
          </label>
          <input
            type="text"
            value={intro}
            onChange={(e) => {
              if (e.target.value.length <= 60) setIntro(e.target.value);
            }}
            placeholder="간단한 자기 소개를 입력하세요."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
          <p className="text-xs text-gray-400">최대 60자</p>
        </div>
      </div>
    </div>
  );
}
