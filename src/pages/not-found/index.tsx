import { Link } from 'react-router-dom';

import errorLogo from '@/shared/assets/icons/full-logo-alyac-404.svg';
import { Button } from '@/shared/ui/button';

export function NotFoundPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <img src={errorLogo} alt="404 Not Found" className="mb-8 w-32" />
      <p className="mb-8 text-gray-500">요청하신 페이지를 찾을 수 없습니다. 😢</p>
      <Link to="/search">
        <Button variant="outline">뒤로 돌아가기</Button>
      </Link>
    </main>
  );
}
