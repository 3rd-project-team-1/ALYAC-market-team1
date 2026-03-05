import { cn } from '@/shared/lib';

interface ModalItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface ListModalProps {
  items: ModalItem[];
  onClose: () => void;
}

export function ListModal({ items, onClose }: ListModalProps) {
  return (
    <>
      <div className={cn('fixed inset-0 z-[100] bg-black/60')} onClick={onClose} />
      <div
        className={cn(
          'bg-background fixed bottom-0 left-1/2 z-[101] w-full max-w-md -translate-x-1/2 overflow-hidden rounded-t-[10px] shadow-xl',
        )}
      >
        <div className={cn('mx-auto my-3 h-1 w-10 rounded-full bg-gray-300')} />
        {items.map((item, index) => (
          <button
            key={index}
            className={cn(
              'border-border hover:bg-accent w-full border-t py-4 text-sm',
              item.danger ? 'text-red-500' : 'text-foreground',
            )}
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

/* 사용 예시
<ListModal
  onClose={() => setIsModalOpen(false)}
  items={[
    { label: '삭제', onClick: handleDelete, danger: true },
    { label: '수정', onClick: handleEdit },
    { label: '웹사이트에서 상품 보기', onClick: handleView },
  ]}
/>
*/
