import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import FindPageInput from './FindPageInput';
import SearchContent from './SearchContent';

import useFocusOutClose from '@/src/hooks/useFocusOutClose';
import useDebounce from '@/src/hooks/useDebounce';
import { videoListProps } from '@/src/lib/types';
import { decomposedSearchValue } from '@/src/utils/decomposedSearchValue';
import informationPageRequestInstance from '@/src/api/InformationPageRequest';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchVideoList, setSearchVideoList] = useState<videoListProps[]>([]);

  const { isFocused, handleFocus, handleBlur } = useFocusOutClose();
  const debounceKeyword = useDebounce(searchKeyword, 300);
  const autoSearchKeyword = decomposedSearchValue(debounceKeyword);

  const router = useRouter();

  useEffect(() => {
    const getVideoList = async () => {
      try {
        const cardList = await informationPageRequestInstance.getVideoList();
        setSearchVideoList(cardList);
      } catch (error) {
        console.error(error);
      }
    };
    getVideoList();
  }, []);

  const filteredList = searchVideoList.filter(({ title, tag }) => {
    const autoSearchTitle = decomposedSearchValue(title);
    const autoSearchTag = tag?.map((tag) => decomposedSearchValue(tag));
    return (
      autoSearchTitle.includes(autoSearchKeyword) ||
      autoSearchTag?.every((content) => content.includes(autoSearchKeyword))
    );
  });

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
