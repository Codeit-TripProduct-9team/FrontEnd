import Image from 'next/image';

import SearchIcon from '@/public/assets/icon/search-header.svg';

/* 검색기능 구현*/

const SearchBar = () => {
  return (
    <div className="flex w-full pl-124 pt-18 pb-21  gap-10 border-b-1 border-black">
      <Image src={SearchIcon} width={16} height={16} alt="search" />
      <input className="w-full text-17 bg-transparent placeholder:text-17" type="text" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
