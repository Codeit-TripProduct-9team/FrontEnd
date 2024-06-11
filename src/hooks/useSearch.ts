import { useState, useEffect, ChangeEvent } from 'react';
import { videoListProps } from '../lib/types';

const useSearch = (searchList: videoListProps[]) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<videoListProps[]>([]);

  useEffect(() => {
    if (searchKeyword) {
      const hasKeyword = searchList.filter(
        ({ title, url, tag }) =>
          title.includes(searchKeyword) || url.includes(searchKeyword) || tag.includes(searchKeyword),
      );

      const deleteDuplicate = Array.from(new Map(hasKeyword.map((item) => [item.id, item])).values());

      setSearchResult(deleteDuplicate);
    } else {
      setSearchResult([]);
    }
  }, [searchKeyword, searchList]);

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  return { searchKeyword, searchResult, handleChangeKeyword, setSearchKeyword };
};

export default useSearch;
