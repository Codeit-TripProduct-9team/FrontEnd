import { useState } from 'react';
import { useRouter } from 'next/router';

import TravelInformationMeta from '../common/meta/TravelInformationMeta';

import SearchBar from './SearchBar';
import ProductInformation from './ProductInformation';
import ProductDescription from './ProductDescription';
import ProductReview from './ProudctReview';

const youtubeData = {
  id: 0,
  url: 'https://www.youtube.com/watch?v=or2TgTRjPq8',
  thumbnail: 'https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg',
  likes: 112,
  title: '[백종원] 백선생과 예산시장한번 가보시는건 어때요?',
  description:
    '백종원이 예산시장에 떴다~! [님아 그시장을 가오 158화]에서 소개된 충남 예산시장에 서 먹부림도 부리고~ 주변에서 들를만한 코스를 추가해서 나만의 여행 코스를 만들어보세요!',
  youtuber: '백종원 PAIK JONG WON',
  viewCount: '143만',
  saveCount: 5,
  updatedAt: '2024. 4. 18.',
  tag: ['🛤️충남', '🧺시장', '먹방🌭'],
};

const TravelInformation = () => {
  const [changeContent, setChangeContent] = useState('information');

  const route = useRouter();
  const pageUrl = route.asPath;

  const selectContent = changeContent === 'information';

  return (
    <>
      <TravelInformationMeta youtubeData={youtubeData} pageUrl={pageUrl} />
      <main className="flex flex-col justify-center items-center ">
        <SearchBar />
        <ProductInformation youtubeData={youtubeData} />
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
    </>
  );
};

export default TravelInformation;
