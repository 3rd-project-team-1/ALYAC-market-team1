import { Button } from '@/shared/ui/button';

interface FeedEmptyProps {
  onSearch: () => void;
}

export function FeedEmpty({ onSearch }: FeedEmptyProps) {
  return (
    <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center">
      <p className="text-lg text-gray-500">유저를 검색해 팔로우 해보세요!</p>
      <Button onClick={onSearch} variant="outline" className="mt-4">
        검색하기
      </Button>
    </main>
  );
}
