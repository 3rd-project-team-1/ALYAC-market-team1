import { Link } from 'react-router-dom';

import { FullLogoAlyac404Icon } from '@/shared/assets';
import { Button } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <FullLogoAlyac404Icon className="size-100" />
      <p className="mb-8 text-gray-500">요청하신 페이지를 찾을 수 없습니다. 😢</p>
      <Link to="/search">
        <Button variant="outline">뒤로 돌아가기</Button>
      </Link>
    </main>
  );
}
