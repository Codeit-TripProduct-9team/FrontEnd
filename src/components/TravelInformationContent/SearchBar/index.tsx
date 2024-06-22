import { useState } from 'react';
import { useRouter } from 'next/router';

import FindPageInput from './FindPageInput';
import SearchContent from './SearchContent';

import useFocusOutClose from '@/src/hooks/useFocusOutClose';
import useDebounce from '@/src/hooks/useDebounce';
import { decomposedSearchValue } from '@/src/utils/decomposedSearchValue';
import informationPageRequestInstance from '@/src/api/InformationPageRequest';
import { useFilteredData } from '@/src/hooks/useFilteredData';

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchVideoList, setSearchVideoList] = useState([]);
  const [hasVideoListData, setHasVideoListData] = useState(false);

  const { isFocused, handleFocus, handleBlur } = useFocusOutClose();

  const debounceKeyword = useDebounce(searchKeyword, 300);
  const autoSearchKeyword = decomposedSearchValue(debounceKeyword);

  const router = useRouter();

  const getSearchPageData = async () => {
    try {
      const cardList = await informationPageRequestInstance.getVideoList();
      setSearchVideoList(cardList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFocusWithFetch = () => {
    handleFocus();
    if (!hasVideoListData) {
      getSearchPageData().then(() => setHasVideoListData(true));
    }
  };

  const filteredList = useFilteredData({ data: searchVideoList }, autoSearchKeyword);

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
        onFocus={handleFocusWithFetch}
        onBlur={handleBlur}
      />
      {showSerachContent && <SearchContent searchResult={searchResult} onClick={handleRouteContentPage} />}
    </section>
  );
};

export default SearchBar;
