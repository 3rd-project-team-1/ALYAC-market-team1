import { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { postApi } from '@/entities/post/api';
import { productApi } from '@/entities/product/api';
import { userApi } from '@/entities/user/api';
import { useProfile } from '@/entities/user/hooks/useProfile';
import messageCircle from '@/shared/assets/icons/message-circle.svg';
import shareIcon from '@/shared/assets/icons/share.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { Button } from '@/shared/ui/button';
import { TopBasicNav } from '@/widgets/top-basic-nav';

type ViewMode = 'grid' | 'list';

export function ProfilePage() {
  const myUserId = localStorage.getItem('lastUserId') ?? undefined;
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { profile, isLoading, isMyProfile } = useProfile(accountname);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [optimisticFollowing, setOptimisticFollowing] = useState<boolean | null>(null);

  // 서버 상태 기반 팔로우 여부 (낙관적 업데이트가 없으면 서버 값 사용)
  const isFollowing = optimisticFollowing ?? profile?.isfollow ?? false;

  // 상품 목록
  const { data: products = [] } = useQuery({
    queryKey: ['products', profile?.accountname],
    queryFn: () =>
      productApi.getUserProducts(profile!.accountname).then((res) => res.data.product),
    enabled: !!profile?.accountname,
  });

  // 게시글 목록
  const { data: posts = [] } = useQuery({
    queryKey: ['userPosts', profile?.accountname],
    queryFn: () => postApi.getUserPosts(profile!.accountname).then((res) => res.data.post),
    enabled: !!profile?.accountname,
  });

  // 팔로우/언팔로우 mutation
  const followMutation = useMutation({
    mutationFn: () =>
      isFollowing
        ? userApi.unfollow(profile!.accountname)
        : userApi.follow(profile!.accountname),
    onMutate: () => {
      // 낙관적 업데이트: 요청 즉시 UI 반영
      setOptimisticFollowing((prev) => !(prev ?? profile?.isfollow ?? false));
    },
    onSuccess: () => {
      // 서버 응답 후 캐시 무효화 → profile 재조회 → optimistic 초기화
      setOptimisticFollowing(null);
      queryClient.invalidateQueries({ queryKey: ['profile', profile?.accountname] });
    },
    onError: () => {
      // 실패 시 낙관적 업데이트 롤백
      setOptimisticFollowing(null);
    },
  });

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen flex-col">
        <TopBasicNav userId={myUserId} />
        <div className="flex flex-1 items-center justify-center">
          <div className="border-muted border-t-foreground h-8 w-8 animate-spin rounded-full border-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col pb-20">
      <TopBasicNav userId={myUserId}/>

      {/* 프로필 정보 */}
      <section className="px-6 pt-[60px] pb-6">
        <div className="flex items-center justify-center gap-12">
          <button className="flex flex-col items-center gap-1">
            <span className="text-foreground text-xl font-bold">{profile?.followerCount ?? 0}</span>
            <span className="text-muted-foreground text-xs">followers</span>
          </button>

          <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
            {profile?.image ? (
              <img src={profile.image} alt={profile.username} className="h-full w-full object-cover" />
            ) : (
              <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
            )}
          </div>

          <button className="flex flex-col items-center gap-1">
            <span className="text-foreground text-xl font-bold">{profile?.followingCount ?? 0}</span>
            <span className="text-muted-foreground text-xs">followings</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-foreground text-base font-semibold">{profile?.username ?? '이름 없음'}</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">@{profile?.accountname ?? ''}</p>
          {profile?.intro && (
            <p className="text-muted-foreground mt-1.5 text-center text-sm">{profile.intro}</p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          {isMyProfile ? (
            <>
              <Button
                variant="outline"
                className="flex-1 rounded-full text-sm font-medium"
                onClick={() => navigate('/edit-profile')}
              >
                프로필 수정
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full text-sm font-medium"
                onClick={() => navigate('/create-product')}
              >
                상품 등록
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-full"
                aria-label="채팅하기"
                onClick={() => navigate('/chat')}
              >
                <img src={messageCircle} alt="채팅" width={20} height={20} />
              </Button>

              <Button
                className={`rounded-full px-8 text-sm font-semibold text-white ${isFollowing ? 'bg-muted-foreground' : 'bg-[#3C9E00] hover:bg-[#2d7a00]'}`}
                onClick={() => followMutation.mutate()}
                disabled={followMutation.isPending}
              >
                {isFollowing ? '언팔로우' : '팔로우'}
              </Button>

              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-full"
                aria-label="공유하기"
              >
                <img src={shareIcon} alt="공유" width={20} height={20} />
              </Button>
            </>
          )}
        </div>
      </section>

      {/* 판매 중인 상품 */}
      {products.length > 0 && (
        <section className="border-border border-t px-4 py-4">
          <h2 className="text-foreground mb-3 text-sm font-semibold">판매 중인 상품</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <div className="h-[90px] w-[90px] overflow-hidden rounded-xl bg-muted">
                  <img src={product.itemImage} alt={product.itemName} className="h-full w-full object-cover" />
                </div>
                <p className="mt-1 max-w-[90px] truncate text-xs font-medium text-foreground">{product.itemName}</p>
                <p className="text-xs text-[#3C9E00]">{product.price.toLocaleString()}원</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 게시글 탭 */}
      <section className="border-border flex-1 border-t">
        <div className="border-border flex justify-end border-b">
          <button className="flex items-center justify-center px-5 py-2.5" onClick={() => setViewMode('list')} aria-label="리스트 뷰">
            {viewMode === 'list' ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M22.75 3.25H3.25V7.58333H22.75V3.25Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
                <path d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
                <path d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M22.75 3.25H3.25V7.58333H22.75V3.25Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
                <path d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
                <path d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button className="flex items-center justify-center px-5 py-2.5" onClick={() => setViewMode('grid')} aria-label="그리드 뷰">
            {viewMode === 'grid' ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
                <path d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
                <path d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
                <path d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z" fill="#767676" stroke="#767676" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
                <path d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
                <path d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
                <path d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z" fill="#DBDBDB" stroke="#DBDBDB" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {posts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground text-sm">작성한 게시물이 없습니다.</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="flex flex-col gap-4 px-4 py-4">
            {posts.map((post) => (
              <div key={post.id} className="cursor-pointer" onClick={() => navigate(`/post/${post.id}`)}>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
                    <img src={post.author.image || uploadImage} alt={post.author.username} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{post.author.username}</p>
                    <p className="text-xs text-muted-foreground">@{post.author.accountname}</p>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-foreground">{post.content}</p>
                {post.image && (
                  <div className="mt-2 overflow-hidden rounded-xl">
                    <img src={post.image.split(',')[0]} alt="게시글 이미지" className="w-full object-cover" />
                  </div>
                )}
                <div className="mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {post.heartCount}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {post.commentCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square cursor-pointer overflow-hidden bg-muted" onClick={() => navigate(`/post/${post.id}`)}>
                {post.image ? (
                  <img src={post.image.split(',')[0]} alt="게시글" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="line-clamp-3 p-2 text-center text-xs text-muted-foreground">{post.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
