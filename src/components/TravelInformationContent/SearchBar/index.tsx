import { useRouter } from 'next/router';

import SearchInput from './SearchInput';
import SearchContent from './SearchContent/indext';

import useSearch from '@/src/hooks/useSearch';

import instance from '@/src/api/axios';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const [searchList, setSearchList] = useState([]);
  const { searchKeyword, searchResult, handleChangeKeyword, setSearchKeyword } = useSearch(searchList);

  const router = useRouter();

  const videoList = async () => {
    try {
      const response = await instance.get('/video');
      const reslut = response.data.data;
      setSearchList(reslut);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    videoList();
  }, []);

  const handleRouteContents = (cardId: number) => {
    const contentLink = `/travel-information/${cardId}`;
    router.push(contentLink);
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
