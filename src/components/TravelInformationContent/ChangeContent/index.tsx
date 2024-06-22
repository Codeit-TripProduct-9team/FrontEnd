import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import ProductDescription from '../ProductDescription';
import ProductReview from '../ProudctReview';

import combineStyle from '@/src/utils/combineStyle';

const contentButtonStyle = {
  base: 'w-334 pt-25 pb-28 h-full text-22',
  selected: 'border-b-black border-b-4 font-bold',
  notSelected: 'border-b-gray-200',
};

const ChangeContent = () => {
  const topRef = useRef(null);
  const router = useRouter();
  const { base, selected, notSelected } = contentButtonStyle;

  const { query } = router;
  const selectedContent = typeof query.content === 'string' ? query.content : 'product';

  const selectDescriptionContent = selectedContent === 'product';
  const selectReviewContent = selectedContent === 'review';

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedContent]);

  return (
    <>
      <div ref={topRef} id="top" className="flex justify-center w-full items-center bg-white">
        <button
          className={combineStyle({
            isSelected: selectDescriptionContent,
            base: base,
            selected: selected,
            notSelected: notSelected,
          })}
          onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, content: 'product' } })}
        >
          상품설명
        </button>
        <button
          className={combineStyle({
            isSelected: selectReviewContent,
            base: base,
            selected: selected,
            notSelected: notSelected,
          })}
          onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, content: 'review' } })}
        >
          리뷰
        </button>
      </div>
      {selectDescriptionContent && (
        <div ref={topRef}>
          <ProductDescription />
        </div>
      )}
      {selectReviewContent && (
        <div className="w-full" ref={topRef}>
          <ProductReview />
        </div>
      )}
    </>
  );
};

export default ChangeContent;
