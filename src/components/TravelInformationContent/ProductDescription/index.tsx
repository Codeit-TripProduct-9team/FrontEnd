import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import convertTime from '@/src/utils/convertTime';
import { placeData } from './mock';
import { useEffect, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';
import extractPath from '@/src/utils/extractPath';
import { BASED_URL } from '@/src/constants/constants';
import instance from '@/src/api/axios';

const ProductDescription = () => {
  const [duration, setDuration] = useState(0);
  const [isLoadingDirection, setIsLoadingDirection] = useState(true);
  const [hasCurrentLocation, setHasCurrentLocation] = useState(true);
  const [polylinePath, setPolylinePath] = useState<{ lat: number; lng: number }[]>([]);
  const [startPoint, setStartPoint] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  const currentLocation = useGeolocation();
  const accessLocation = currentLocation.error === null;

  useEffect(() => {
    const position = { lat: currentLocation.latitude, lng: currentLocation.longitude };
    if (accessLocation) {
      setHasCurrentLocation(true);
      setStartPoint(position);
    }
    if (!accessLocation) {
      setHasCurrentLocation(false);
    }
  }, [accessLocation, currentLocation.latitude, currentLocation.longitude]);

  const isValidCoordinate = startPoint && startPoint.lat !== 0 && startPoint.lng !== 0;

  useEffect(() => {
    const getDestinationDirection = async () => {
      const hasStartPoint = startPoint && startPoint.lat !== null && startPoint.lng !== null;
      if (hasStartPoint) {
        const queryParams = new URLSearchParams({
          origin: `${startPoint.lng},${startPoint.lat}`,
          destination: `${placeData.position.lng},${placeData.position.lat}`,
        });

        const requestUrl = `${BASED_URL.KAKKAO_DIRECTION}?${queryParams}`;

        try {
          const response = await instance.get(requestUrl, {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}`,
            },
          });

          const elapsedTime = response.data.routes[0].summary.duration;
          const path = extractPath(response.data);
          setPolylinePath(path);
          setDuration(elapsedTime);
        } catch (error) {
          setPolylinePath([]);
          setDuration(0);
        } finally {
          setIsLoadingDirection(false);
        }
      }
    };

    if (isValidCoordinate) {
      getDestinationDirection();
    }
  }, [isValidCoordinate, startPoint]);

  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <LocationDescription placeData={placeData} />
        <div className="relative w-822 h-670 my-66 mx-108 rounded-l overflow-hidden">
          {hasCurrentLocation ? (
            <CurrentLocation
              startPoint={startPoint}
              destinationName={placeData.title}
              elapsedTime={convertTime(duration)}
            />
          ) : (
            <CustomLocation
              destinationName={placeData.title}
              elapsedTime={convertTime(duration)}
              setStartPoint={setStartPoint}
              isLoadingDirection={isLoadingDirection}
            />
          )}
          <ProductMap
            startPoint={startPoint}
            position={placeData.position}
            polylinePath={polylinePath}
            place={placeData.title}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
