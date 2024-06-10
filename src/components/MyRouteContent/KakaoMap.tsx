import { Map, MapMarker, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { mockMyRoute } from './mockMyRoute';
import React from 'react';

const KakaoMap = () => {
  const positions = mockMyRoute.data;
  return (
    <>
      <Map center={positions[0].latlng} className="w-460 h-288 rounded-8 shadow-md z-0">
        {positions.map((position, index) => (
          <React.Fragment key={`${index}-${position.title}`}>
            <MapMarker
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
          </React.Fragment>
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
