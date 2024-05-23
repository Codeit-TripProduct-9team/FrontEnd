import { useState } from 'react';

import Button from '../common/button';

import YoutubeInformation from './YoutubeInformation';
import ProductDescription from './ProductDescription';
import ProductReview from './ProudctReview';

const TravelInformation = () => {
  const [changeContent, setChangeContent] = useState('information');

  const handleChangeContent = (content: string) => {
    setChangeContent(content);
  };

  const selectContent = changeContent === 'information';

  return (
    <main className="flex flex-col justify-center items-center gap-30">
      <YoutubeInformation />
      <div className="flex gap-30">
        <Button bgColor={'violet'} textColor={'white'} onClick={() => handleChangeContent('information')}>
          상품설명
        </Button>
        <Button bgColor={'violet'} textColor={'white'} onClick={() => handleChangeContent('review')}>
          리뷰
        </Button>
      </div>
      {selectContent ? <ProductDescription /> : <ProductReview />}
    </main>
  );
};

export default TravelInformation;
