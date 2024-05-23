import DetailInformation from './DetailInformation';
import Button from '../common/button';
import ProductDescription from './ProductDescription';
import ProductReview from './ProudctReview';
import { useState } from 'react';

const DetailContent = () => {
  const [changeContent, setChageContent] = useState(true);
  const handleChangeContent = () => {
    setChageContent(!changeContent);
  };
  return (
    <main className="flex flex-col justify-center items-center gap-30">
      <DetailInformation />
      <div className="flex gap-30">
        <Button bgColor={'violet'} textColor={'white'} onClick={handleChangeContent}>
          상품설명
        </Button>
        <Button bgColor={'violet'} textColor={'white'} onClick={handleChangeContent}>
          리뷰
        </Button>
      </div>
      {changeContent ? <ProductDescription /> : <ProductReview />}
    </main>
  );
};

export default DetailContent;
