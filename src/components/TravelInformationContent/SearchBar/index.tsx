import { useRouter } from 'next/router';

import SearchInput from './SearchInput';
import SearchContent from './SearchContent';
import useSearch from '@/src/hooks/useSearch';

import instance from '@/src/api/axios';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const [searchList, setSearchList] = useState([]);
  const { searchKeyword, searchResult, handleChangeKeyword, setSearchKeyword } = useSearch(searchList);

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

  const router = useRouter();

  const handleRouteContents = (videoId: number) => {
    const contentLink = `/travel-information/${videoId}`;
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
