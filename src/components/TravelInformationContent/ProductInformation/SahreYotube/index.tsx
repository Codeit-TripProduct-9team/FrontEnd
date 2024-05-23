import { useState } from 'react';
import { loadKakaoSDK } from '@/src/utils/KakaoShare';

const ShareYoutube = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const handleShareModal = () => {
    setIsOpenedModal(true);
    alert('공유 모달');
  };

  const shareFacebook = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
  };

  const shareTwitter = () => {
    const link = window.location.href;
    const twitterIntent = `https://twitter.com/intent/tweet?text=custom%20text&url=${link}`;
    window.open(twitterIntent, '_blank');
  };

  const shareKakao = () => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = loadKakaoSDK;
    document.head.appendChild(script);
  };

  return (
    <>
      <div className="text-30" onClick={handleShareModal}>
        🔄
      </div>

      {isOpenedModal && (
        <div className="flex gap-30">
          <button id="kakaotalk-sharing-btn" onClick={shareKakao}>
            카카오
          </button>
          <button onClick={shareFacebook}>페이스북</button>
          <button onClick={shareTwitter}>트위터</button>
        </div>
      )}
    </>
  );
};

export default ShareYoutube;
