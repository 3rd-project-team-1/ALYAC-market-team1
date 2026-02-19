import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { getTokenUserInfo } from '@/entities/auth/lib/token';
import { userApi } from '@/entities/user/api';
import type { User } from '@/entities/user/types';

type ViewMode = 'grid' | 'list';

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenInfo = getTokenUserInfo();
        if (tokenInfo?.accountname) {
          const res = await userApi.getProfile(tokenInfo.accountname);
          setUser(res.data.user);
          setIsMyProfile(true);
        } else {
          const res = await userApi.getMyProfile();
          setUser(res.data.user);
          setIsMyProfile(true);
        }
      } catch {
        // 에러 시 무시
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center"
            aria-label="더보기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#767676" stroke="#767676" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" fill="#767676" stroke="#767676" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="#767676" stroke="#767676" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </button>
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-lg bg-white py-2 shadow-lg">
                <button
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50"
                  onClick={() => { navigate('/settings'); setIsMenuOpen(false); }}
                >
                  설정 및 개인정보
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50">
                  <span>테마:</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <button
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그아웃
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* 프로필 정보 */}
      <section className="px-6 pb-6 pt-6">
        {/* 아바타 + 팔로워/팔로잉 */}
        <div className="flex items-center justify-center gap-12">
          {/* 팔로워 */}
          <button className="flex flex-col items-center gap-1">
            <span className="text-xl font-bold text-gray-900">
              {user?.followers?.length ?? 0}
            </span>
            <span className="text-xs text-gray-500">Followers</span>
          </button>

          {/* 아바타 - 테두리 없음 */}
          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
            {user?.image ? (
              <img src={user.image} alt={user.username} className="h-full w-full object-cover" />
            ) : (
              <img src="/download.png" alt="기본 프로필" className="h-full w-full object-cover" />
            )}
          </div>

          {/* 팔로잉 */}
          <button className="flex flex-col items-center gap-1">
            <span className="text-xl font-bold text-gray-900">
              {user?.following?.length ?? 0}
            </span>
            <span className="text-xs text-gray-500">Followings</span>
          </button>
        </div>

        {/* 이름 & 계정명 & 소개글 */}
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-base font-semibold text-gray-900">{user?.username ?? '이름 없음'}</h1>
          <p className="mt-0.5 text-sm text-gray-400">@{user?.accountname ?? ''}</p>
          {user?.intro && (
            <p className="mt-1.5 text-center text-sm text-gray-500">{user.intro}</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="mt-5 flex gap-3">
          {isMyProfile ? (
            <>
              <button
                className="flex-1 rounded-full py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" style={{ border: '1px solid #dbdbdb' }}
                onClick={() => navigate('/settings')}
              >
                프로필 수정
              </button>
              <button
                className="flex-1 rounded-full py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" style={{ border: '1px solid #dbdbdb' }}
                onClick={() => navigate('/post/new')}
              >
                상품 등록
              </button>
            </>
          ) : (
            <>
              <button
                className="flex-1 rounded-full py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" style={{ border: '1px solid #dbdbdb' }}
                onClick={() => navigate('/chat')}
              >
                채팅하기
              </button>
              <button className="flex-1 rounded-full bg-green-500 py-2 text-sm font-medium text-white hover:bg-green-600">
                팔로우
              </button>
            </>
          )}
        </div>
      </section>

      {/* 게시글 탭 */}
      <section className="flex-1" style={{ borderTop: '1px solid #f0f0f0' }}>
        {/* 탭 - 오른쪽 정렬 */}
        <div className="flex justify-end" style={{ borderBottom: '1px solid #f0f0f0' }}>
          <button
            className="flex items-center justify-center px-5 py-2.5"
            onClick={() => setViewMode('list')}
            aria-label="리스트 뷰"
          >
            {viewMode === 'list' ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.75 3.25H3.25V7.58333H22.75V3.25Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
                <path d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
                <path d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.75 3.25H3.25V7.58333H22.75V3.25Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
                <path d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
                <path d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          <button
            className="flex items-center justify-center px-5 py-2.5"
            onClick={() => setViewMode('grid')}
            aria-label="그리드 뷰"
          >
            {viewMode === 'grid' ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
                <path d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
                <path d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
                <path d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z" fill="#767676" stroke="#767676" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
                <path d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
                <path d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
                <path d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* 빈 게시글 */}
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-gray-400">작성한 게시물이 없습니다.</p>
        </div>
      </section>
    </div>
  );
}
