import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ChangeContent from './ChangeContent';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import useVideoInformaiton from '@/src/hooks/useVideoInformaiton';

const TravelInformation = () => {
  return (
    <main className="flex flex-col justify-center items-center ">
      <TravelInformationMeta youtubeData={useVideoInformaiton()} />
      <SearchBar />
      <ProductInformation youtubeData={useVideoInformaiton()} />
      <ChangeContent />
    </main>
  );
};

export default TravelInformation;
