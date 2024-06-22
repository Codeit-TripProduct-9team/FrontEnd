import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useGeolocation from 'react-hook-geolocation';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import convertTime from '@/src/utils/convertTime';
import extractPath from '@/src/utils/extractPath';
import { BASED_URL } from '@/src/constants/constants';
import instance from '@/src/api/axios';
import { PlaceDataProps } from '@/src/lib/types';

const ProductDescription = () => {
  const [duration, setDuration] = useState(0);
  const [hasCurrentLocation, setHasCurrentLocation] = useState(true);
  const [polylinePath, setPolylinePath] = useState<{ lat: number; lng: number }[]>([]);
  const [startPoint, setStartPoint] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [videoPlaceData, setVideoPlaceData] = useState<PlaceDataProps>({});

  const currentLocation = useGeolocation();
  const accessLocation = currentLocation.error === null;

  const route = useRouter();
  const videoId = route.query.id as string;

  useEffect(() => {
    if (videoId === undefined) {
      return;
    }

    const getVideoDescription = async () => {
      try {
        const response = await instance.get(`/course/${videoId}`);
        setVideoPlaceData(response.data.data.course[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getVideoDescription();
  }, [videoId]);

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
    if (!isValidCoordinate) {
      return;
    }

    const getDestinationDirection = async () => {
      const hasStartPoint = startPoint.lat !== null && startPoint.lng !== null;

      const hasDestination = videoPlaceData.posX !== undefined || videoPlaceData.posY !== undefined;

      if (!hasDestination) {
        return;
      }

      if (hasStartPoint) {
        const queryParams = new URLSearchParams({
          origin: `${startPoint.lng},${startPoint.lat}`,
          destination: `${videoPlaceData.posY},${videoPlaceData.posX}`,
        });

        try {
          const response = await instance.get(`${BASED_URL.KAKKAO_DIRECTION}?${queryParams}`, {
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
        }
      }
    };

    getDestinationDirection();
  }, [isValidCoordinate, startPoint, videoPlaceData.posX, videoPlaceData.posY]);

  const hasPlaceData = videoPlaceData.posY !== undefined && videoPlaceData.posX !== undefined;

  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <LocationDescription
          image={videoPlaceData.img}
          title={videoPlaceData.name}
          description={videoPlaceData.description}
        />
        <div className="relative w-822 h-670 my-66 mx-108 rounded-l overflow-hidden">
          {hasCurrentLocation ? (
            <CurrentLocation
              startPoint={startPoint}
              destinationName={videoPlaceData.name}
              elapsedTime={convertTime(duration)}
            />
          ) : (
            <CustomLocation
              destinationName={videoPlaceData.name}
              elapsedTime={convertTime(duration)}
              setStartPoint={setStartPoint}
            />
          )}
          {hasPlaceData && (
            <ProductMap
              startPoint={startPoint}
              position={{ lat: videoPlaceData.posX, lng: videoPlaceData.posY }}
              polylinePath={polylinePath}
              place={videoPlaceData.name}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
