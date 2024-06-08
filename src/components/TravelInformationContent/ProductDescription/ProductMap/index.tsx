import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

interface MapProps {
  startPoint: { lat: number; lng: number };
  position: {
    lat: number;
    lng: number;
  };
  polylinePath: { lat: number; lng: number }[];
}

const ProductMap = ({ position, polylinePath, startPoint }: MapProps) => {
  return (
    <>
      <Map center={position} level={8} className="w-622 h-470 rounded-8 shadow-md z-0">
        <Polyline path={polylinePath} />
        <MapMarker position={position} />
        <MapMarker position={startPoint} />
      </Map>
    </>
  );
};

export default ProductMap;
