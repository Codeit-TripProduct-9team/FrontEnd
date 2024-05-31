import { useState, useEffect } from 'react';

import useGeolocation from 'react-hook-geolocation';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import { placeData } from './mock';

const ProductDescription = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [hasCurrnetLocation, setHasCurrentLocation] = useState(true);
  const [polylinePath, setPolylinePath] = useState<{ lat: number; lng: number }[]>([]);

  const currentLocation = useGeolocation();

  useEffect(() => {
    const accessLocation = currentLocation.error === null;
    if (accessLocation) {
      setHasCurrentLocation(true);
      setStartPoint({ lat: currentLocation.latitude, lng: currentLocation.longitude });
    }
    if (!accessLocation) {
      setHasCurrentLocation(false);
    }
  }, [currentLocation]);

  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <LocationDescription placeData={placeData} />
        <div className="relative w-622 h-470 my-66 mx-108 rounded-l overflow-hidden">
          {hasCurrnetLocation ? (
            <CurrentLocation
              startPoint={startPoint}
              destinationName={placeData.title}
              destinationPosition={placeData.position}
              setPolylinePath={setPolylinePath}
            />
          ) : (
            <CustomLocation
              destinationName={placeData.title}
              destinationPosition={placeData.position}
              setPolylinePath={setPolylinePath}
              setCustomStartPoint={setStartPoint}
            />
          )}
          <ProductMap startPoint={startPoint} position={placeData.position} polylinePath={polylinePath} />
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
