import Script from 'next/script';
import { Map, MapMarker, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { mockMyRoute } from './mockMyRoute';
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&autoload=false`;

// const positions = [
//   {
//     title: '카카오',
//     latlng: { lat: 33.450705, lng: 126.570677 },
//   },
//   {
//     title: '생태연못',
//     latlng: { lat: 33.450936, lng: 126.569477 },
//   },
//   {
//     title: '텃밭',
//     latlng: { lat: 33.450879, lng: 126.56994 },
//   },
//   {
//     title: '근린공원',
//     latlng: { lat: 33.451393, lng: 126.570738 },
//   },
// ];

const KakaoMap = () => {
  const positions = mockMyRoute.data;
  return (
    <>
      <Script src={KAKAO_SDK_URL} />
      <Map center={{ lat: 33.450701, lng: 126.570667 }} className="w-460 h-288 rounded-8 shadow-md">
        {positions.map((position, index) => (
          <>
            <MapMarker
              key={index}
              position={position.latlng}
              title={position.title}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                },
              }}
            />
            <CustomOverlayMap position={position.latlng} yAnchor={2.5}>
              <div className="relative px-6 py-3 text-white bg-blue rounded-l shadow-sub">
                <p>{position.place}</p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-blue border-l-8 border-l-transparent border-r-8 border-r-transparent" />
              </div>
            </CustomOverlayMap>
          </>
        ))}

        <Polyline
          path={positions.map((position) => position.latlng)}
          strokeWeight={3}
          strokeColor={'#34C231'}
          strokeOpacity={1}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
