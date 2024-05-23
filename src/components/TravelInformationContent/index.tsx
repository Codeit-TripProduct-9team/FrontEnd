import { useState } from 'react';

import Button from '../common/button';

import InformationList from './informationContent';
import ProductInformation from './ProductInformation';
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
      <InformationList />
      <ProductInformation />
      <div className="flex gap-30">
        <Button bgColor={'green'} textColor={'white'} onClick={() => handleChangeContent('information')}>
          상품설명
        </Button>
        <Button bgColor={'green'} textColor={'white'} onClick={() => handleChangeContent('review')}>
          리뷰
        </Button>
      </div>
      {selectContent ? <ProductDescription /> : <ProductReview />}
    </main>
  );
};

export default TravelInformation;
