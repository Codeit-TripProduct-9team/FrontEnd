import Link from 'next/link';

import Button from '@/src/components/common/button';

const ProductCardButton = () => {
  const handleRegistMyPlace = () => {
    //마이플레이스 등록
    //모달 등록되었습니다.
  };

  return (
    <div className="flex justify-end  gap-12">
      <Link href="/my-route">
        <Button className="bg-blue w-134 h-39 text-18 font-bold" textColor={'white'} onClick={handleRegistMyPlace}>
          지금 코스짜기
        </Button>
      </Link>
      <Button className="bg-blue w-161 h-39 text-18 font-bold" textColor={'white'} onClick={handleRegistMyPlace}>
        마이플레이스 등록
      </Button>
    </div>
  );
};
export default ProductCardButton;
