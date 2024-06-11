import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ChangeContent from './ChangeContent';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import { getVideoInformation } from '@/src/api/getVideoInfo';

const TravelInformation = () => {
  const route = useRouter();
  const pageUrl = route.asPath;
  const videoId = route.query.id as string;

  const { data: videoInformation } = useQuery({
    queryKey: ['videoInformation', videoId],
    queryFn: () => getVideoInformation(videoId),
    enabled: !!videoId && videoId !== undefined,
  });

  const youtubeData = videoInformation?.data;

  return (
    <main className="flex flex-col justify-center items-center ">
      <TravelInformationMeta youtubeData={youtubeData} pageUrl={pageUrl} />
      <SearchBar />
      <ProductInformation youtubeData={youtubeData} />
      <ChangeContent />
    </main>
  );
};

export default TravelInformation;
