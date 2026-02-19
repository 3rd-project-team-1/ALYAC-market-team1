import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className='space-y-3'>
      <h1 className='text-2xl font-semibold'>404 - 페이지를 찾을 수 없습니다</h1>
      <p className='text-sm'>요청하신 경로가 존재하지 않거나 이동되었습니다.</p>
      <Link to='/' className='inline-block rounded-md border px-3 py-1.5 text-sm'>
        홈으로 이동
      </Link>
    </section>
  );
}
