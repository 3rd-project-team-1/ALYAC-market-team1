import { useState } from 'react';

import { TopSearchNav } from '@/widgets/top-search-nav';

export function SearchPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <TopSearchNav searchValue={searchValue} onSearchChange={setSearchValue} />
      <main className="mx-auto max-w-5xl pt-[48px]">{/* 검색 결과 */}</main>
    </div>
  );
}
