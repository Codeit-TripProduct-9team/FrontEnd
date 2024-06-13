import { useState, useEffect, ChangeEvent } from 'react';

import { useRouter } from 'next/router';

import { videoListProps } from '../lib/types';
import instance from '../api/axios';
import useDebounce from './useDebounce';

const useSearchVideo = () => {
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

  const handleRouteContents = (videoId: number) => {
    const contentLink = `/travel-information/${videoId}`;
    setTimeout(() => {
      router.push(contentLink);
    }, 500);
    setSearchKeyword('');
  };

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  return { searchKeyword, searchResult, handleChangeKeyword, handleRouteContents };
};

export default useSearchVideo;
