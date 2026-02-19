import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';
import type { User } from '@/entities/user/types';

export function SettingsPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
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
          const u = res.data.user;
          setUser(u);
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

  const handleSave = () => {
    // TODO: 저장 API 연동
    navigate('/profile');
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
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center"
          aria-label="뒤로가기"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4166 11H4.58325" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.9999 17.4167L4.58325 11L10.9999 4.58334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-base font-semibold text-gray-900">프로필 수정</h1>
        <button
          onClick={handleSave}
          className="text-sm font-semibold"
          style={{ color: '#3C9E00' }}
        >
          저장
        </button>
      </header>

      {/* 프로필 이미지 */}
      <div className="flex justify-center py-8">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
            {imagePreview ? (
              <img src={imagePreview} alt="프로필 이미지" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl text-gray-400">
                {username?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
          </div>
          {/* 카메라 아이콘 버튼 */}
          <button
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: '#3C9E00' }}
            aria-label="이미지 변경"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
          <label className="text-xs font-medium" style={{ color: '#3C9E00' }}>
            사용자 이름
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="2~10자 이내여야 합니다."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
        </div>

        {/* 계정 ID */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: '#3C9E00' }}>
            계정 ID
          </label>
          <input
            type="text"
            value={accountname}
            onChange={(e) => setAccountname(e.target.value)}
            placeholder="영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
        </div>

        {/* 소개 */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: '#3C9E00' }}>
            소개
          </label>
          <input
            type="text"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder="자신에 대해 소개해 주세요!"
            className="w-full border-b py-2 text-sm text-gray-900 outline-none placeholder:text-gray-300"
            style={{ borderColor: '#dbdbdb' }}
          />
        </div>
      </div>
    </div>
  );
}
