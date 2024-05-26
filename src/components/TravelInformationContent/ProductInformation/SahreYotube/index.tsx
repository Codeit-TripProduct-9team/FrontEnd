import { useState } from 'react';

const ShareYoutube = () => {
  const [isToggledModal, setIsToggledModal] = useState(false);

  const handleShareModal = () => {
    setIsToggledModal(true);
    shareKakao();
    alert('공유 모달');
  };

  const shareKakao = () => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.onload = () => {
      const { Kakao }: any = window;
      Kakao.cleanup();
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_KEY);
      Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: 'Utrip',
          description: '여행정보공유',
          imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
          link: {
            webUrl: 'https://developers.kakao.com',
          },
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              webUrl: 'https://developers.kakao.com',
            },
          },
        ],
      });
    };
    document.head.appendChild(script);
  };

  const shareFacebook = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
  };

  const shareTwitter = () => {
    const link = window.location.href;
    const twitterIntent = `https://twitter.com/intent/tweet?text=custom%20text&url=${link}`;
    window.open(twitterIntent, '_blank');
  };

  return (
    <>
      <div className="text-30" onClick={handleShareModal}>
        🔄
      </div>

      {isToggledModal && (
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
