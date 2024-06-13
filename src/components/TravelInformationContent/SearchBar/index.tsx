import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import FindPageInput from './FindPageInput';
import SearchContent from './SearchContent';

import instance from '@/src/api/axios';
import useFocusOutClose from '@/src/hooks/useFocusOutClose';
import useDebounce from '@/src/hooks/useDebounce';
import { videoListProps } from '@/src/lib/types';

const SearchBar = () => {
  const { isFocused, handleFocus, handleBlur } = useFocusOutClose();

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchVideoList, setSearchVideoList] = useState<videoListProps[]>([]);
  const [searchResult, setSearchResult] = useState<videoListProps[]>([]);

  const debounceKeyword = useDebounce(searchKeyword);

  const router = useRouter();

  useEffect(() => {
    const getVideoList = async () => {
      try {
        const response = await instance.get('/video');
        const reslut = response.data.data;
        setSearchVideoList(reslut);
      } catch (error) {
        console.error(error);
      }
    };
    getVideoList();
  }, []);

  useEffect(() => {
    const filteredList = searchVideoList.filter(
      ({ title, url, tag }) =>
        title.includes(debounceKeyword) || url.includes(debounceKeyword) || tag.includes(debounceKeyword),
    );

    setSearchResult(debounceKeyword.trim() === '' ? [] : filteredList);
  }, [debounceKeyword, searchVideoList]);

  const handleRouteContentPage = (videoId: number) => {
    const contentLink = `/travel-information/${videoId}`;
    setTimeout(() => {
      router.push(contentLink);
    }, 500);
    setSearchKeyword('');
  };

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  const showSerachContent = isFocused && searchResult.length > 0;

  return (
    <section className="relative w-full ">
      <FindPageInput
        searchKeyword={searchKeyword}
        onChange={handleChangeKeyword}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showSerachContent && <SearchContent searchResult={searchResult} onClick={handleRouteContentPage} />}
    </section>
  );
};

export default SearchBar;
