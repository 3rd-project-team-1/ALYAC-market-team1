import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useUserPostsWithHeart } from '@/entities/post/hooks/useUserPostsWithHeart';
import { useUserProducts } from '@/entities/product/hooks/useUserProducts';
import { useProfile } from '@/entities/user/hooks/useProfile';
import { useProfileFollow } from '@/entities/user/hooks/useProfileFollow';
import messageCircle from '@/shared/assets/icons/message-circle.svg';
import shareIcon from '@/shared/assets/icons/share.svg';
import uploadImage from '@/shared/assets/icons/upload-image.svg';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { Button } from '@/shared/ui/button';
import { TopBasicNav } from '@/widgets/top-basic-nav';

type ViewMode = 'grid' | 'list';

export function ProfilePage() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const { profile, isLoading, isError, isMyProfile } = useProfile(accountname);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { isFollowing, followMutation, toggleFollow } = useProfileFollow({
    initialIsFollow: profile?.isfollow,
  });

  const { products } = useUserProducts(profile?.accountname);
  const { posts, heartMutation } = useUserPostsWithHeart(profile?.accountname);

  if (isLoading) {
    return (
      <div className="bg-background flex min-h-screen flex-col">
        <TopBasicNav />
        <LoadingSpinner fullScreen={false} message="프로필을 불러오는 중입니다..." />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-background flex min-h-screen flex-col">
        <TopBasicNav />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground text-sm">해당 계정을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col pb-20">
      <TopBasicNav />

      {/* 프로필 정보 */}
      <section className="px-6 pt-[60px] pb-6">
        <div className="flex items-center justify-center gap-12">
          <button
            className="flex flex-col items-center gap-1"
            onClick={() => navigate(`/followers/${profile.accountname}`)}
          >
            <span className="text-foreground text-xl font-bold">{profile?.followerCount ?? 0}</span>
            <span className="text-muted-foreground text-xs">followers</span>
          </button>

          <div className="bg-muted h-24 w-24 overflow-hidden rounded-full">
            {getImageUrl(profile?.image) ? (
              <img
                src={getImageUrl(profile?.image)!}
                alt={profile?.username}
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={uploadImage} alt="기본 프로필" className="h-full w-full object-cover" />
            )}
          </div>

          <button
            className="flex flex-col items-center gap-1"
            onClick={() => navigate(`/followings/${profile.accountname}`)}
          >
            <span className="text-foreground text-xl font-bold">
              {profile?.followingCount ?? 0}
            </span>
            <span className="text-muted-foreground text-xs">followings</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <h1 className="text-foreground text-base font-semibold">
            {profile?.username ?? '이름 없음'}
          </h1>
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
                onClick={() => toggleFollow(profile.accountname)}
                disabled={followMutation.isPending || !profile.accountname}
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
              <div
                key={product.id}
                className="flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/edit-product/${product.id}`, { state: { product } })}
              >
                <div className="bg-muted h-[90px] w-[90px] overflow-hidden rounded-xl">
                  <img
                    src={getImageUrl(product.itemImage) ?? product.itemImage}
                    alt={product.itemName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-foreground mt-1 max-w-[90px] truncate text-xs font-medium">
                  {product.itemName}
                </p>
                <p className="text-xs text-[#3C9E00]">{product.price.toLocaleString()}원</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 게시글 탭 */}
      <section className="border-border flex-1 border-t">
        <div className="border-border flex justify-end border-b">
          <button
            className="flex items-center justify-center px-5 py-2.5"
            onClick={() => setViewMode('list')}
            aria-label="리스트 뷰"
          >
            {viewMode === 'list' ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M22.75 3.25H3.25V7.58333H22.75V3.25Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M22.75 3.25H3.25V7.58333H22.75V3.25Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 10.8333H3.25V15.1667H22.75V10.8333Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.75 18.4167H3.25V22.75H22.75V18.4167Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          <button
            className="flex items-center justify-center px-5 py-2.5"
            onClick={() => setViewMode('grid')}
            aria-label="그리드 뷰"
          >
            {viewMode === 'grid' ? (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
                <path
                  d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
                  fill="#767676"
                  stroke="#767676"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 3.25H15.1667V10.8333H22.7501V3.25Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M22.7501 15.1667H15.1667V22.75H22.7501V15.1667Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
                <path
                  d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
                  fill="#DBDBDB"
                  stroke="#DBDBDB"
                  strokeLinecap="round"
                />
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
              <div
                key={post.id}
                className="cursor-pointer"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted h-8 w-8 overflow-hidden rounded-full">
                    <img
                      src={getImageUrl(post.author.image) ?? uploadImage}
                      alt={post.author.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-semibold">{post.author.username}</p>
                    <p className="text-muted-foreground text-xs">@{post.author.accountname}</p>
                  </div>
                </div>
                <p className="text-foreground mt-2 line-clamp-2 text-sm">{post.content}</p>
                {post.image && (
                  <div className="mt-2 overflow-hidden rounded-xl">
                    <img
                      src={getImageUrl(post.image.split(',')[0]) ?? post.image.split(',')[0]}
                      alt="게시글 이미지"
                      className="w-full object-cover"
                    />
                  </div>
                )}
                <div className="mt-2 flex items-center gap-4">
                  <button
                    type="button"
                    className="text-muted-foreground flex items-center gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      heartMutation.mutate(post.id);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.9202 4.01322C16.5204 3.60554 16.0456 3.28215 15.5231 3.0615C15.0006 2.84086 14.4406 2.72729 13.875 2.72729C13.3094 2.72729 12.7494 2.84086 12.2268 3.0615C11.7043 3.28215 11.2296 3.60554 10.8298 4.01322L9.99997 4.85889L9.17017 4.01322C8.36252 3.19013 7.26713 2.72772 6.12495 2.72772C4.98277 2.72772 3.88737 3.19013 3.07973 4.01322C2.27209 4.83631 1.81836 5.95266 1.81836 7.11668C1.81836 8.28071 2.27209 9.39706 3.07973 10.2201L3.90953 11.0658L9.99997 17.2728L16.0904 11.0658L16.9202 10.2201C17.3202 9.81266 17.6376 9.32885 17.8541 8.79635C18.0706 8.26385 18.182 7.69309 18.182 7.11668C18.182 6.54028 18.0706 5.96952 17.8541 5.43702C17.6376 4.90452 17.3202 4.4207 16.9202 4.01322Z"
                        fill={post.hearted ? '#FF0000' : 'none'}
                        stroke={post.hearted ? '#FF0000' : '#767676'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {post.heartCount}
                  </button>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <img src={messageCircle} alt="댓글" width={16} height={16} />
                    {post.commentCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-muted aspect-square cursor-pointer overflow-hidden"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.image ? (
                  <img
                    src={getImageUrl(post.image.split(',')[0]) ?? post.image.split(',')[0]}
                    alt="게시글"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-muted-foreground line-clamp-3 p-2 text-center text-xs">
                      {post.content}
                    </p>
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
