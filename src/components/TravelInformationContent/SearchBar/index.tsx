import { useState, useEffect, ChangeEvent } from 'react';

import { useRouter } from 'next/router';

import { mock } from '../../mainContent/mock';
import SearchInput from './SearchInput';
import SearchContent from './SearchContent/indext';

interface MockDataItem {
  cardId: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
  url: string;
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
    setSearchKeyword('');
  };

  return (
    <div className="relative w-full ">
      <SearchInput searchKeyword={searchKeyword} onChange={handleChangeKeyword} />
      {searchResult.length > 0 && <SearchContent searchResult={searchResult} onClick={handleRouteContents} />}
    </div>
  );
};

export default SearchBar;
