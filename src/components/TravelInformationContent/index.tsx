import { useRouter } from 'next/router';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';

import { youtubeMockData } from './mock';
import ChangeContent from './ChangeContent';

const TravelInformation = () => {
  const route = useRouter();
  const pageUrl = route.asPath;

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
