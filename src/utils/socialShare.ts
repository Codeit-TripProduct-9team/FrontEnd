import toast from 'react-hot-toast';
import { kakaoShareProps } from '../lib/types';

export const shareKakao = ({ title, description, thumbnail }: kakaoShareProps) => {
  return () => {
    const { Kakao }: any = window;
    Kakao.cleanup();
    Kakao.init(process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO);
    Kakao.Share.createDefaultButton({
      container: '#kakaotalk-sharing-btn',
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: thumbnail,
        link: {
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: 'uTrip으로 이동',
          link: {
            webUrl: window.location.href,
          },
        },
      ],
    });
  };
};

export const shareFacebook = () => {
  const link = window.location.href;
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${link}`);
};

export const shareTwitter = () => {
  const link = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=custom%20text&url=${link}`);
};

export const currentPageUrl = () => {
  navigator.clipboard.writeText(window.location.href);
  toast.success(`링크가 복사되었습니다. ${window.location.href}`);
};
