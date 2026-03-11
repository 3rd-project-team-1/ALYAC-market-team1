import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';
import { LogoutModal } from '@/shared/ui';
import { MoreMenu, TopBasicNav } from '@/widgets/top-basic-nav';

import { CommentFooter } from './CommentFooter';
import { PostCommentsList } from './PostCommentsList';
import { PostDetailCard } from './PostDetailCard';

interface PostPageContentProps {
  post: {
    id: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    hearted: boolean;
    heartCount: number;
    commentCount: number;
    author: {
      image: string;
      username: string;
      accountname: string;
    };
  };
  comments: Array<{
    id: string;
    content: string;
    createdAt: string;
    author: {
      image: string;
      username: string;
      accountname: string;
    };
  }>;
  myAccountname: string | null;
  isHeartPending: boolean;
  postDialogType: 'report' | 'delete' | null;
  moreMenuItems: Array<{ label: ReactNode; onClick: () => void }>;
  onToggleHeart: () => void;
  onDeleteComment: (commentId: string) => void;
  onCreateComment: (text: string) => void;
  onReportConfirm: () => void;
  onDeleteConfirm: () => void;
  onCloseDialog: () => void;
}

export function PostPageContent({
  post,
  comments,
  myAccountname,
  isHeartPending,
  postDialogType,
  moreMenuItems,
  onToggleHeart,
  onDeleteComment,
  onCreateComment,
  onReportConfirm,
  onDeleteConfirm,
  onCloseDialog,
}: PostPageContentProps) {
  return (
    <div className={cn('bg-background flex min-h-screen flex-col pt-[48px]')}>
      <TopBasicNav moreMenu={<MoreMenu items={moreMenuItems} />} />

      <PostDetailCard post={post} onToggleHeart={onToggleHeart} isHeartPending={isHeartPending} />

      <div className={cn('border-border mt-4 border-t')} />

      <PostCommentsList
        comments={comments}
        myAccountname={myAccountname}
        onDeleteComment={onDeleteComment}
      />

      <CommentFooter onSubmit={onCreateComment} />

      {postDialogType === 'report' && (
        <LogoutModal
          title="신고하시겠습니까?"
          confirmText="신고"
          cancelText="취소"
          onConfirm={onReportConfirm}
          onCancel={onCloseDialog}
        />
      )}

      {postDialogType === 'delete' && (
        <LogoutModal
          title="게시글을 삭제할까요?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={onDeleteConfirm}
          onCancel={onCloseDialog}
        />
      )}
    </div>
  );
}
