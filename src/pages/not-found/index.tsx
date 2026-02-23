import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/button';
import errorLogo from '@/shared/assets/icons/full-logo-alyac-404.svg';

export function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <img src={errorLogo} alt="404 Not Found" className="w-32 mb-8" />
      <p className="text-gray-500 mb-8">페이지를 찾을 수 없습니다. :(</p>
      <Link to="/search">
        <Button variant="outline">뒤로 돌아가기</Button>
      </Link>
    </main>
  );
}