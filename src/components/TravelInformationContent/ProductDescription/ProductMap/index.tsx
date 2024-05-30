import Script from 'next/script';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&autoload=false`;

export interface MapProps {
  startPoint: { lat: number; lng: number };
  mapPosition: {
    lat: number;
    lng: number;
  };
  markerList: Array<{
    lat: number;
    lng: number;
  }>;
  polylinePath: { lat: number; lng: number }[];
}

const ProductMap = ({ mapPosition, markerList, polylinePath, startPoint }: MapProps) => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={mapPosition} level={8} className="w-622 h-470 rounded-8 shadow-md">
        <Polyline path={polylinePath} />
        {markerList.map((marker, index) => (
          <MapMarker key={index} position={marker} />
        ))}
        <MapMarker position={startPoint} />
      </Map>
    </>
  );
};

export default ProductMap;
