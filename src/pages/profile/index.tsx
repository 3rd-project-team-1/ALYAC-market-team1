import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft, MoreVertical } from 'lucide-react';

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
      <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-800"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center"
            aria-label="더보기"
          >
            <MoreVertical className="h-5 w-5 text-gray-800" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-10 w-36 overflow-hidden rounded-lg bg-white py-1 shadow-lg">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                설정 및 개인정보
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-50">
                로그아웃
              </button>
            </div>
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
              <div className="flex h-full w-full items-center justify-center text-3xl text-gray-400">
                {user?.username?.[0]?.toUpperCase() ?? '?'}
              </div>
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
                className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => navigate('/settings')}
              >
                프로필 수정
              </button>
              <button
                className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => navigate('/post/new')}
              >
                상품 등록
              </button>
            </>
          ) : (
            <>
              <button
                className="flex-1 rounded-full border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
      <section className="flex-1 border-t border-gray-100">
        {/* 탭 - 오른쪽 정렬 */}
        <div className="flex justify-end border-b border-gray-100">
          <button
            className={`flex items-center justify-center px-5 py-2.5 ${
              viewMode === 'list' ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-300'
            }`}
            onClick={() => setViewMode('list')}
            aria-label="리스트 뷰"
          >
            {/* 리스트 아이콘: 좌측 점 + 우측 선 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="9" y1="6" x2="21" y2="6" />
              <line x1="9" y1="12" x2="21" y2="12" />
              <line x1="9" y1="18" x2="21" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
              <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
          </button>
          <button
            className={`flex items-center justify-center px-5 py-2.5 ${
              viewMode === 'grid' ? 'border-b-2 border-gray-800 text-gray-800' : 'text-gray-300'
            }`}
            onClick={() => setViewMode('grid')}
            aria-label="그리드 뷰"
          >
            {/* 그리드 아이콘: 4분할 */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
        </div>

        {/* 빈 게시글 */}
        <div className="flex flex-col items-center justify-center gap-2 py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm text-gray-400">아직 게시물이 없습니다.</p>
        </div>
      </section>
    </div>
  );
}
