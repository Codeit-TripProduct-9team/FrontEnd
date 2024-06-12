import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ChangeContent from './ChangeContent';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import useVideoInformaiton from '@/src/hooks/useVideoInformaiton';

const TravelInformation = () => {
  const { youtubeData, youtubeDataLoading } = useVideoInformaiton();

  return (
    <main className="flex flex-col justify-center items-center ">
      <TravelInformationMeta youtubeData={youtubeData} />
      <SearchBar />
      <ProductInformation youtubeData={youtubeData} loading={youtubeDataLoading} />
      <ChangeContent />
    </main>
  );
};

export default TravelInformation;
