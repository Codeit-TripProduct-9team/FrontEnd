import { useState, useEffect, ChangeEvent } from 'react';

interface MockDataItem {
  cardId: number;
  thumbnail: string;
  likes: number;
  title: string;
  description: string;
  tag: string[];
  url: string;
}

const useSearch = (mockData: { data: MockDataItem[] }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<MockDataItem[]>([]);

  useEffect(() => {
    if (searchKeyword) {
      const hasKeyword = mockData.data.filter(
        ({ title, description, tag }) =>
          title.includes(searchKeyword) ||
          description.includes(searchKeyword) ||
          tag.some((tag) => tag.includes(searchKeyword)),
      );

      const deleteDuplicate = Array.from(new Map(hasKeyword.map((item) => [item.cardId, item])).values());

      setSearchResult(deleteDuplicate);
    } else {
      setSearchResult([]);
    }
  }, [searchKeyword, mockData.data]);

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  return { searchKeyword, searchResult, handleChangeKeyword, setSearchKeyword };
};

export default useSearch;
