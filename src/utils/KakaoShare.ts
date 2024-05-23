export const loadKakaoSDK = () => {
  const { Kakao }: any = window;
  Kakao.cleanup();
  Kakao.init('85c33ac4bef04e22351db00aedc485cd');
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
