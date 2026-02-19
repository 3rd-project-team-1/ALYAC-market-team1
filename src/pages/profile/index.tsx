import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChevronLeft, Grid2X2, List, MoreVertical } from 'lucide-react';

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
      <header className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center"
            aria-label="더보기"
          >
            <MoreVertical className="h-6 w-6 text-gray-800" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-10 w-36 rounded-lg border border-gray-100 bg-white py-1 shadow-md">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">
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
      <section className="px-6 pb-6 pt-2">
        {/* 아바타 + 팔로워/팔로잉 가로 배치 */}
        <div className="flex items-center justify-center gap-10">
          {/* 팔로워 */}
          <button className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-gray-900">
              {user?.followers?.length ?? 0}
            </span>
            <span className="text-xs text-gray-500">followers</span>
          </button>

          {/* 아바타 */}
          <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
            {user?.image ? (
              <img src={user.image} alt={user.username} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl text-gray-400">
                {user?.username?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
          </div>

          {/* 팔로잉 */}
          <button className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-gray-900">
              {user?.following?.length ?? 0}
            </span>
            <span className="text-xs text-gray-500">followings</span>
          </button>
        </div>

        {/* 이름 & 계정명 & 소개글 */}
        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-base font-semibold text-gray-900">{user?.username ?? '이름 없음'}</h1>
          <p className="mt-0.5 text-sm text-gray-400">@{user?.accountname ?? ''}</p>
          {user?.intro && (
            <p className="mt-2 text-center text-sm text-gray-500">{user.intro}</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="mt-5 flex justify-center gap-3">
          {isMyProfile ? (
            <>
              <button
                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => navigate('/settings')}
              >
                프로필 수정
              </button>
              <button
                className="rounded-full border border-green-500 px-6 py-2 text-sm font-medium text-green-500 hover:bg-green-50"
                onClick={() => navigate('/post/new')}
              >
                상품 등록
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => navigate('/chat')}
              >
                채팅하기
              </button>
              <button className="rounded-full bg-green-500 px-6 py-2 text-sm font-medium text-white hover:bg-green-600">
                팔로우
              </button>
            </>
          )}
        </div>
      </section>

      {/* 판매중인 상품 */}
      <section className="border-t border-gray-100 px-4 py-4">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">판매중인 상품</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          <p className="text-sm text-gray-400">등록된 상품이 없습니다.</p>
        </div>
      </section>

      {/* 게시글 탭 */}
      <section className="flex-1 border-t border-gray-100">
        <div className="flex">
          <button
            className={`flex flex-1 items-center justify-center py-3 ${
              viewMode === 'list'
                ? 'border-b-2 border-gray-800 text-gray-800'
                : 'border-b border-gray-100 text-gray-400'
            }`}
            onClick={() => setViewMode('list')}
            aria-label="리스트 뷰"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            className={`flex flex-1 items-center justify-center py-3 ${
              viewMode === 'grid'
                ? 'border-b-2 border-gray-800 text-gray-800'
                : 'border-b border-gray-100 text-gray-400'
            }`}
            onClick={() => setViewMode('grid')}
            aria-label="그리드 뷰"
          >
            <Grid2X2 className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-center py-16 text-sm text-gray-400">
          게시글이 없습니다.
        </div>
      </section>
    </div>
  );
}
