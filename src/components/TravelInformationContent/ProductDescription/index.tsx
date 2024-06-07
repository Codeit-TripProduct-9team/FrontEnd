import { useState, useEffect } from 'react';

import useGeolocation from 'react-hook-geolocation';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import convertTime from '@/src/utils/convertTime';
import getDirection from '@/src/utils/getDireciton';

import { placeData } from './mock';

const ProductDescription = () => {
  const [duration, setDuration] = useState(0);
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [polylinePath, setPolylinePath] = useState<{ lat: number; lng: number }[]>([]);
  const [hasCurrentLocation, setHasCurrentLocation] = useState(true);

  const currentLocation = useGeolocation();

  const accessLocation = currentLocation.error === null;
  const isValidCoordinate = startPoint && startPoint.lat !== 0 && startPoint.lng !== 0;

  useEffect(() => {
    if (accessLocation) {
      setHasCurrentLocation(true);
      setStartPoint({ lat: currentLocation.latitude, lng: currentLocation.longitude });
    }
    if (!accessLocation) {
      setHasCurrentLocation(false);
    }
  }, [accessLocation, currentLocation.latitude, currentLocation.longitude]);

  useEffect(() => {
    if (isValidCoordinate) {
      const getRoute = async () => {
        const directionData = await getDirection(startPoint, placeData.position);
        if (directionData) {
          const { path, elapsedTime } = directionData;
          setPolylinePath(path);
          setDuration(elapsedTime);
        }
      };
      getRoute();
    }
  }, [isValidCoordinate, startPoint]);

  const elapsedTime = convertTime(duration);
  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <LocationDescription placeData={placeData} />
        <div className="relative w-622 h-470 my-66 mx-108 rounded-l overflow-hidden">
          {hasCurrentLocation ? (
            <CurrentLocation startPoint={startPoint} destinationName={placeData.title} elapsedTime={elapsedTime} />
          ) : (
            <CustomLocation
              destinationName={placeData.title}
              setPolylinePath={setPolylinePath}
              setStartPoint={setStartPoint}
              destinationPosition={placeData.position}
              duration={duration}
              setDuration={setDuration}
            />
          )}
          <ProductMap startPoint={startPoint} position={placeData.position} polylinePath={polylinePath} />
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
