const KakaoAuth = () => {
  const CLIENT_ID_KAKAO = process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO;
  const REDIRECT_URI = 'https://utrip.netlify.app/oauth';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID_KAKAO}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  kakaoLogin();
};

export default KakaoAuth;
