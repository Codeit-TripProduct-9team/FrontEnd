import Link from 'next/link';
import Image from 'next/image';

import { useOverlay } from '@toss/use-overlay';

import SharedModal from './SharedModal';

import shareIcon from '@/public/assets/icon/share.svg';

import Modal from '@/src/components/common/modal';
import Button from '@/src/components/common/button';
import { currentPageUrl, shareFacebook, shareKakao, shareTwitter } from '@/src/utils/socialShare';
import { kakaoShareProps } from '@/src/lib/types';

const ProductCardButton = ({ title, description, thumbnail }: kakaoShareProps) => {
  const handleRegistMyPlace = () => {
    //마이플레이스 등록
    //모달 등록되었습니다.
  };

  const sharedOverlay = useOverlay();
  const sharedOnModal = () => {
    sharedOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <SharedModal
          shareOnFacebook={shareFacebook}
          shareOnKakao={shareKakao({ title, description, thumbnail })}
          shareOnTwitter={shareTwitter}
          currentPageUrl={currentPageUrl}
        />
      </Modal>
    ));
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
      <button className="flex items-center py-6 px-16 rounded-s bg-gray-10" onClick={sharedOnModal}>
        <Image src={shareIcon} alt="share" width={27} height={27} />
      </button>
    </div>
  );
};
export default ProductCardButton;
