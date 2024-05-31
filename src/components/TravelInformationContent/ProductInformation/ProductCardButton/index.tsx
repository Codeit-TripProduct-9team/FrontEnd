import Link from 'next/link';
import Image from 'next/image';

import shareIcon from '@/public/assets/icon/share.svg';

import Button from '@/src/components/common/button';

const ProductCardButton = () => {
  const handleRegistMyPlace = () => {
    //마이플레이스 등록
    //모달 등록되었습니다.
  };

  return (
    <div className="flex gap-12">
      <Link href="/my-route">
        <Button className="bg-blue w-134 h-39 text-18 font-bold" textColor={'white'} onClick={handleRegistMyPlace}>
          지금 코스짜기
        </Button>
      </Link>
      <Button className="bg-blue w-161 h-39 text-18 font-bold" textColor={'white'} onClick={handleRegistMyPlace}>
        마이플레이스 등록
      </Button>
      <button className="flex items-center py-6 px-16 rounded-s bg-gray-10">
        <Image src={shareIcon} alt="share" width={27} height={27} />
      </button>
    </div>
  );
};
export default ProductCardButton;
