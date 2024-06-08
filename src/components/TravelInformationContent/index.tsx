import { useRouter } from 'next/router';

import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ChangeContent from './ChangeContent';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import { youtubeMockData } from './mock';
import instance from '@/src/api/axios';
import { useCallback, useEffect } from 'react';

const TravelInformation = () => {
  const route = useRouter();
  const pageUrl = route.asPath;
  const videoId = route.query.id as string;

  const getYoutubeList = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [videoId]);

  useEffect(() => {
    getYoutubeList();
  }, [getYoutubeList]);

  return (
    <main className="flex flex-col justify-center items-center ">
      <TravelInformationMeta youtubeData={youtubeMockData} pageUrl={pageUrl} />
      <SearchBar />
      <ProductInformation youtubeData={youtubeMockData} />
      <ChangeContent />
    </main>
  );
};

export default TravelInformation;
