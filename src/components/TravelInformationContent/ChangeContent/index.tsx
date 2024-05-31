import { useState } from 'react';

import ProductDescription from '../ProductDescription';
import ProductReview from '../ProudctReview';

const ChangeContent = () => {
  const [changeContent, setChangeContent] = useState('information');

  const selectContent = changeContent === 'information';
  return (
    <>
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
    </>
  );
};

export default ChangeContent;
