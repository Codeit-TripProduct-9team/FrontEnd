import { useState, useEffect, ChangeEvent } from 'react';

import { useRouter } from 'next/router';

import { videoListProps } from '../lib/types';
import instance from '../api/axios';

const useSearchVideo = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchVideoList, setSearchVideoList] = useState<videoListProps[]>([]);
  const [searchResult, setSearchResult] = useState<videoListProps[]>([]);

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
        title.includes(searchKeyword) || url.includes(searchKeyword) || tag.includes(searchKeyword),
    );

    setSearchResult(searchKeyword.trim() === '' ? [] : filteredList);
  }, [searchKeyword, searchVideoList]);

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
