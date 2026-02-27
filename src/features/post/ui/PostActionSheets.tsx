interface PostActionSheetProps {
  isOpen: boolean;
  isMyPost: boolean;
  isDeletePending: boolean;
  onClose: () => void;
  onDeletePost: () => void;
}

interface CommentActionSheetProps {
  isOpen: boolean;
  isDeletePending: boolean;
  onClose: () => void;
  onDeleteComment: () => void;
}

export function PostActionSheet({
  isOpen,
  isMyPost,
  isDeletePending,
  onClose,
  onDeletePost,
}: PostActionSheetProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-background w-full max-w-md rounded-t-2xl pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center py-3">
          <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
        </div>
        <button
          type="button"
          className="text-foreground hover:bg-accent w-full px-6 py-4 text-left text-sm"
          onClick={onClose}
        >
          신고하기
        </button>
        {isMyPost && (
          <button
            type="button"
            className="text-destructive hover:bg-accent w-full px-6 py-4 text-left text-sm"
            onClick={onDeletePost}
            disabled={isDeletePending}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}

export function CommentActionSheet({
  isOpen,
  isDeletePending,
  onClose,
  onDeleteComment,
}: CommentActionSheetProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="bg-background w-full max-w-md rounded-t-2xl pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center py-3">
          <div className="bg-muted-foreground/30 h-1 w-10 rounded-full" />
        </div>
        <button
          type="button"
          className="text-destructive hover:bg-accent w-full px-6 py-4 text-left text-sm"
          onClick={onDeleteComment}
          disabled={isDeletePending}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
