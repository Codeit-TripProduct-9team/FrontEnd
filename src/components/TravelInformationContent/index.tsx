import { useState } from 'react';
import { useRouter } from 'next/router';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ProductDescription from './ProductDescription';
import ProductReview from './ProudctReview';

import { youtubeMockData } from './mock';

const TravelInformation = () => {
  const [changeContent, setChangeContent] = useState('information');

  const route = useRouter();
  const pageUrl = route.asPath;

  const selectContent = changeContent === 'information';

  return (
    <main className="flex flex-col justify-center items-center ">
      <TravelInformationMeta youtubeData={youtubeMockData} pageUrl={pageUrl} />
      <SearchBar />
      <ProductInformation youtubeData={youtubeMockData} />
      <div className="flex justify-center items-center bg-white w-full">
        <button
          className={`w-334 pt-25 pb-28 h-full text-22  ${
            selectContent ? 'border-b-black border-b-4 font-bold' : 'border-b-gray-200 '
          }`}
          onClick={() => setChangeContent('information')}
        >
          상품설명
        </button>
        <button
          className={`w-334 pt-25 pb-28 h-full text-22 ${
            !selectContent ? 'border-b-black border-b-4 font-bold' : 'border-b-gray-200 '
          }`}
          onClick={() => setChangeContent('review')}
        >
          리뷰
        </button>
      </div>
      {selectContent ? <ProductDescription /> : <ProductReview />}
    </main>
  );
};

export default TravelInformation;
