import ProductDescription from '../ProductDescription';
import ProductReview from '../ProudctReview';

import useSelectContent from '@/src/hooks/useSelectContent';

const ChangeContent = () => {
  const { content, handleChangeContent } = useSelectContent('product');

  const selectContent = content === 'product';

  const contentButtonStyle = {
    base: 'w-334 pt-25 pb-28 h-full text-22',
    selected: 'border-b-black border-b-4 font-bold',
    notSelected: 'border-b-gray-200',
  };

  const selectButtonStyle = (isSelected: boolean) => {
    return `${contentButtonStyle.base} ${isSelected ? contentButtonStyle.selected : contentButtonStyle.notSelected}`;
  };

  return (
    <>
      <div className="flex justify-center items-center bg-white w-full">
        <button className={selectButtonStyle(content === 'product')} onClick={() => handleChangeContent('product')}>
          상품설명
        </button>
        <button className={selectButtonStyle(content === 'review')} onClick={() => handleChangeContent('review')}>
          리뷰
        </button>
      </div>
      {selectContent ? <ProductDescription /> : <ProductReview />}
    </>
  );
};

export default ChangeContent;
