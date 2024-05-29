import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&autoload=false`;

export interface MapProps {
  mapPosition: {
    lat: number;
    lng: number;
  };
  markerList: Array<{
    lat: number;
    lng: number;
  }>;
}

const ProductMap = ({ mapPosition, markerList }: MapProps) => {
  return (
    <div className="w-622 h-470 my-66 mx-108 rounded-l overflow-hidden">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={mapPosition} className="w-622 h-470 rounded-8 shadow-md">
        {markerList.map((marker, index) => (
          <MapMarker key={index} position={marker} />
        ))}
      </Map>
    </div>
  );
};

export default ProductMap;
