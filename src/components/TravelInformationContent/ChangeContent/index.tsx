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
  const { content, handleChangeContent } = useSelectContent('product');
  const selectTab = content === 'product';

  return (
    <>
      <div className="flex justify-center items-center bg-white w-full">
        <button
          className={combineStyle({
            isSelected: selectTab,
            base: contentButtonStyle.base,
            selected: contentButtonStyle.selected,
            notSelected: contentButtonStyle.notSelected,
          })}
          onClick={() => handleChangeContent('product')}
        >
          상품설명
        </button>
        <button
          className={combineStyle({
            isSelected: !selectTab,
            base: contentButtonStyle.base,
            selected: contentButtonStyle.selected,
            notSelected: contentButtonStyle.notSelected,
          })}
          onClick={() => handleChangeContent('review')}
        >
          리뷰
        </button>
      </div>
      {selectTab ? <ProductDescription /> : <ProductReview />}
    </>
  );
};

export default ChangeContent;
