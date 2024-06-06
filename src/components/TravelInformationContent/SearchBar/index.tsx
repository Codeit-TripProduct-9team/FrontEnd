import { useState, useEffect, ChangeEvent } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';

import SearchIcon from '@/public/assets/icon/search-header.svg';

import { mock } from '../../mainContent/mock';

interface MockDataItem {
  cardId: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
}

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<MockDataItem[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (searchKeyword) {
      const hasKeyword = mock.data.filter(
        ({ title, description, tag }) =>
          title.includes(searchKeyword) ||
          description.includes(searchKeyword) ||
          tag.some((tag) => tag.includes(searchKeyword)),
      );

      const deleteDuplicate = Array.from(new Map(hasKeyword.map((item) => [item.cardId, item])).values());

      console.log(deleteDuplicate);

      setSearchResult(deleteDuplicate);
    }
    if (!searchKeyword) {
      setSearchResult([]);
    }
  }, [searchKeyword]);

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  const handleRouteContents = (cardId: number) => {
    router.push(`/travel-information/${cardId}`);
  };

  return (
    <div className="relative  w-full ">
      <div className="flex w-full pl-124 pt-18 pb-21 gap-10 border-b-1 border-black">
        <Image src={SearchIcon} width={16} height={16} alt="search" />
        <input
          className="w-full text-17 bg-transparent placeholder:text-17"
          type="text"
          placeholder="Search"
          value={searchKeyword}
          onChange={handleChangeKeyword}
        />
      </div>
      {searchResult.length > 0 && (
        <ul className="absolute flex flex-col gap-16  left-150 top-50 rounded-m  text-center w-693 bg-white overflow-hidden ">
          {searchResult.map(({ cardId, title }) => (
            <li
              key={cardId}
              className="p-4 text-18 text-gray-50 cursor-pointer hover:bg-gray-200"
              onClick={() => handleRouteContents(cardId)}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
