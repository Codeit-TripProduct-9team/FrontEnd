import { CustomOverlayMap, Map, MapMarker, Polyline, ZoomControl } from 'react-kakao-maps-sdk';

interface MapProps {
  startPoint: { lat: number; lng: number };
  position: {
    lat: number;
    lng: number;
  };
  polylinePath: { lat: number; lng: number }[];
  place: string;
}

const ProductMap = ({ position, polylinePath, startPoint, place }: MapProps) => {
  return (
    <Map center={position} level={8} padding={5} className="w-822 h-670 rounded-8 shadow-md z-0">
      <Polyline path={polylinePath} endArrow />
      <MapMarker position={position} />
      <CustomOverlayMap position={position} yAnchor={2.5}>
        <div className="relative px-10 py-5 text-white bg-blue rounded-m shadow-sub">
          <p>{place}</p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-blue border-l-8 border-l-transparent border-r-8 border-r-transparent" />
        </div>
      </CustomOverlayMap>
      <MapMarker position={startPoint} />
      <ZoomControl position={'BOTTOMRIGHT'} />
    </Map>
  );
};

export default ProductMap;
