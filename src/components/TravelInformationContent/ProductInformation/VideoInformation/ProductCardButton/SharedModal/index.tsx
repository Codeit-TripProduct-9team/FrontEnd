import Image from 'next/image';

import facebookIcon from '@/public/assets/icon/modal-facebook.png';
import kakaoIcon from '@/public/assets/icon/modal-kakao.png';
import linkIcon from '@/public/assets/icon/modal-link.png';

interface ShareModalProps {
  shareOnFacebook: () => void;
  shareOnKakao: () => void;
  shareOnTwitter: () => void;
}

const SharedModal = ({ shareOnFacebook, shareOnKakao, shareOnTwitter }: ShareModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-232 gap-20 text-center pb-30">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">공유하기</h1>
        <div className="flex w-full justify-center gap-30">
          <button onClick={shareOnFacebook}>
            <Image src={facebookIcon} width={40} height={40} alt="facebook" />
          </button>
          <button id="kakaotalk-sharing-btn" onClick={shareOnKakao}>
            <Image src={kakaoIcon} width={40} height={40} alt="kakao" />
          </button>
          <button onClick={shareOnTwitter}>
            <Image src={linkIcon} width={40} height={40} alt="twitter" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedModal;
