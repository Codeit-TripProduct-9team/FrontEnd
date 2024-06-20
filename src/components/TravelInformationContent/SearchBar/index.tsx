import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import FindPageInput from './FindPageInput';
import SearchContent from './SearchContent';

import instance from '@/src/api/axios';
import useFocusOutClose from '@/src/hooks/useFocusOutClose';
import useDebounce from '@/src/hooks/useDebounce';
import { videoListProps } from '@/src/lib/types';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchVideoList, setSearchVideoList] = useState<videoListProps[]>([]);

  const { isFocused, handleFocus, handleBlur } = useFocusOutClose();
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

  const filteredList = searchVideoList.filter(
    ({ title, tag }) => title.includes(debounceKeyword) || tag?.some((content) => content.includes(debounceKeyword)),
  );

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

  const searchResult = debounceKeyword.trim() === '' ? [] : filteredList;

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
