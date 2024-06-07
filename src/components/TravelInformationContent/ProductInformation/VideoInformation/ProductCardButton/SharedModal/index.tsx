import Image from 'next/image';

import facebookIcon from '@/public/assets/icon/modal-facebook.png';
import kakaoIcon from '@/public/assets/icon/modal-kakao.png';
import linkIcon from '@/public/assets/icon/modal-link.png';
import twitterIcon from '@/public/assets/icon/modal-x.svg';

interface ShareModalProps {
  shareOnFacebook: () => void;
  shareOnKakao: () => void;
  shareOnTwitter: () => void;
  currentPageUrl: () => void;
}

const shareButtonStyle = 'flex flex-col justify-center items-center gap-10';

const SharedModal = ({ shareOnFacebook, shareOnKakao, shareOnTwitter, currentPageUrl }: ShareModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-232 gap-20 text-center pb-15">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24 pb-20">공유하기</h1>
        <div className="flex w-full justify-center items-center  gap-30">
          <button className={shareButtonStyle} onClick={shareOnFacebook}>
            <Image src={facebookIcon} width={40} height={40} alt="facebook" />
            <p>페이스북</p>
          </button>
          <button id="kakaotalk-sharing-btn" className={shareButtonStyle} onClick={shareOnKakao}>
            <Image src={kakaoIcon} width={40} height={40} alt="kakao" />
            <p>카카오톡</p>
          </button>
          <button className={shareButtonStyle} onClick={shareOnTwitter}>
            <Image src={twitterIcon} width={40} height={40} alt="twitter" />
            <p>트위터</p>
          </button>
          <button className={shareButtonStyle} onClick={currentPageUrl}>
            <Image src={linkIcon} width={40} height={40} alt="twitter" />
            <p>링크 복사</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedModal;
