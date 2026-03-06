import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { deletePost } from '@/entities/post/api/deletePost';
import { useUserPostsWithHeart } from '@/entities/post/hooks/useUserPostsWithHeart';
import {
  ChatIcon,
  HeartIcon,
  PostAlbumIcon,
  PostListIcon,
  UploadImageSmallIcon,
} from '@/shared/assets';
import { cn, getTokenUserInfo } from '@/shared/lib';
import { getImageUrl } from '@/shared/lib/utils/getImageUrl';
import { MoreMenu } from '@/widgets/top-basic-nav';

type ViewMode = 'grid' | 'list';

export function ProfilePostsSection() {
  const { accountname } = useParams<{ accountname: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const tokenInfo = getTokenUserInfo();
  const myAccountname = tokenInfo?.accountname ?? tokenInfo?.account ?? null;
  const targetAccountname = accountname ?? myAccountname;
  const { posts, heartMutation } = useUserPostsWithHeart(targetAccountname);

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', targetAccountname] });
      toast.success('게시글이 삭제되었습니다');
    },
    onError: () => {
      toast.error('게시글 삭제에 실패했습니다');
    },
  });

  return (
    <section className={cn('border-border flex-1 border-t')}>
      <div className={cn('border-border flex justify-end border-b')}>
        <button
          className={cn('flex items-center justify-center px-5 py-2.5')}
          onClick={() => setViewMode('list')}
          aria-label="리스트 뷰"
        >
          <PostListIcon />
        </button>

        <button
          className={cn('flex items-center justify-center px-5 py-2.5')}
          onClick={() => setViewMode('grid')}
          aria-label="그리드 뷰"
        >
          <PostAlbumIcon />
        </button>
      </div>

      {posts.length === 0 ? (
        <div className={cn('flex items-center justify-center py-20')}>
          <p className={cn('text-muted-foreground text-sm')}>작성한 게시물이 없습니다.</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className={cn('flex flex-col gap-4 px-4 py-4')}>
          {posts.map((post) => (
            <div
              key={post.id}
              className={cn('')}
            >
              <div className={cn('flex items-center justify-between')}>
                <div className={cn('flex items-center gap-3')}>
                  <div className={cn('bg-muted h-8 w-8 overflow-hidden rounded-full')}>
                    {post.author.image ? (
                      <img
                        src={getImageUrl(post.author.image) ?? post.author.image}
                        alt={post.author.username}
                        className={cn('h-full w-full object-cover')}
                      />
                    ) : (
                      <div className={cn('flex h-full w-full items-center justify-center')}>
                        <UploadImageSmallIcon />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className={cn('text-foreground text-sm font-semibold')}>
                      {post.author.username}
                    </p>
                    <p className={cn('text-muted-foreground text-xs')}>
                      @{post.author.accountname}
                    </p>
                  </div>
                </div>
                {myAccountname === post.author.accountname && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <MoreMenu
                      small
                      items={[
                        {
                          label: '수정',
                          onClick: () =>
                            navigate(`/post/${post.id}/edit`, { state: { post } }),
                        },
                        {
                          label: <span className={cn('text-destructive')}>삭제</span>,
                          onClick: () => deletePostMutation.mutate(post.id),
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
              <p className={cn('text-foreground mt-2 line-clamp-2 pl-12 text-sm')}>
                {post.content}
              </p>
              {post.image && (
                <div className={cn('mt-2 overflow-hidden rounded-xl pl-12')}>
                  <img
                    src={getImageUrl(post.image.split(',')[0]) ?? post.image.split(',')[0]}
                    alt="게시글 이미지"
                    className={cn('w-full object-cover')}
                  />
                </div>
              )}
              <div className={cn('mt-2 flex items-center gap-4 pl-12')}>
                <button
                  type="button"
                  className={cn('text-muted-foreground flex items-center gap-1 text-xs')}
                  onClick={(e) => {
                    e.stopPropagation();
                    heartMutation.mutate(post.id);
                  }}
                >
                  <HeartIcon active={post.hearted} />
                  {post.heartCount}
                </button>
                <button
                  type="button"
                  className={cn('text-muted-foreground flex items-center gap-1 text-xs')}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <ChatIcon />
                  {post.commentCount}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={cn('grid grid-cols-3 gap-0.5')}>
          {posts.map((post) => (
            <div
              key={post.id}
              className={cn('bg-muted aspect-square overflow-hidden')}
            >
              {post.image ? (
                <img
                  src={getImageUrl(post.image.split(',')[0]) ?? post.image.split(',')[0]}
                  alt="게시글"
                  className={cn('h-full w-full object-cover')}
                />
              ) : (
                <div className={cn('flex h-full w-full items-center justify-center')}>
                  <p className={cn('text-muted-foreground line-clamp-3 p-2 text-center text-xs')}>
                    {post.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
