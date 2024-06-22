import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductDescription from '../ProductDescription';
import ProductReview from '../ProudctReview';
import combineStyle from '@/src/utils/combineStyle';
import useSelectContent from '@/src/hooks/useSelectContent';

const contentButtonStyle = {
  base: 'w-334 pt-25 pb-28 h-full text-22',
  selected: 'border-b-black border-b-4 font-bold',
  notSelected: 'border-b-gray-200',
};

const ChangeContent = () => {
  const route = useRouter();
  const { content, handleSelectContent } = useSelectContent('product');
  const { base, selected, notSelected } = contentButtonStyle;

  const videoId = route.query.id as string;

  useEffect(() => {
    const queryContent = route.query.content;
    if (queryContent === 'review') {
      handleSelectContent('review');
    }
    if (queryContent === 'product') {
      handleSelectContent('product');
    }
  }, [route.query.content, handleSelectContent]);

  const selectDescriptionContent = content === 'product';
  const selectReviewContent = content === 'review';

  const handleTabClick = (tab: string) => {
    const newUrl =
      tab === 'product'
        ? `/travel-information/${videoId}?content=product`
        : `/travel-information/${videoId}?content=review`;
    route.push(newUrl, undefined, { shallow: true });
    handleSelectContent(tab);
  };

  return (
    <>
      <div id="top" className="flex justify-center w-full items-center bg-white">
        <button
          className={combineStyle({
            isSelected: selectDescriptionContent,
            base: base,
            selected: selected,
            notSelected: notSelected,
          })}
          onClick={() => handleTabClick('product')}
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
          onClick={() => handleTabClick('review')}
        >
          리뷰
        </button>
      </div>
      {selectDescriptionContent && <ProductDescription />}
      {selectReviewContent && <ProductReview />}
    </>
  );
};

export default ChangeContent;
