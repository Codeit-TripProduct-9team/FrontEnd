import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&autoload=false`;
// const KAKAO_SDK_LIB_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&libraries=services,clusterer,drawing`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      {/* <Script src={KAKAO_SDK_LIB_URL} strategy="beforeInteractive" /> */}

      <Map center={{ lat: 33.450701, lng: 126.570667 }} className="w-500 h-500 rounded-8" />
    </>
  );
};

export default KakaoMap;
