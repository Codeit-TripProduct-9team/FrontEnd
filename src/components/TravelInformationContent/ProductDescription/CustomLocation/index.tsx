import { useState, useEffect, useCallback } from 'react';

import convertTime from '@/src/utils/convertTime';
import getDirectionRequest from '@/src/utils/getDirectionRequest';
import { KAKAO_ROAD_BASED_URL } from '@/src/constants/url';
import extractPath from '@/src/utils/extractPath';
import instance from '@/src/api/axios';
import LocationInput from './LocationInput';

interface ElaspedTimeProps {
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  startPoint?: { lat: number; lng: number };
  setPolylinePath: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }[]>>;
  setCustomStartPoint: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const CustomLocation = ({
  destinationName,
  destinationPosition,
  setPolylinePath,
  setCustomStartPoint,
}: ElaspedTimeProps) => {
  const [duration, setDuration] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [invalidKeyword, setInvalidKeyword] = useState(0);
  const [customStartingPoint, setCustomStartingPoint] = useState('');
  const [coordinate, setCoordinate] = useState({ lng: '', lat: '' });
  const [customRoute, setCustomRoute] = useState<{ lat: number; lng: number }[]>([]);

  const getCoordinate = useCallback(
    async (address: string) => {
      const encodedAddress = encodeURIComponent(address);
      try {
        const response = await instance.get(`${KAKAO_ROAD_BASED_URL}${encodedAddress}`, {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        });
        const result = await response.data;
        const customLocation = result.documents[0];
        const coordinate = { lat: customLocation.y, lng: customLocation.x };
        setCoordinate(coordinate);
        setCustomStartPoint(coordinate);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [setCustomStartPoint],
  );

  const getDirection = useCallback(async () => {
    const { requestUrl, headers } = getDirectionRequest(coordinate, destinationPosition);
    try {
      const response = await instance.get(requestUrl, {
        headers: headers,
      });

      const result = await response.data;
      const elapsedTime = result.routes[0].summary.duration;

      const path = extractPath(result);
      setCustomRoute(path);
      setDuration(elapsedTime);
      setInvalidKeyword(result.totalCount);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [coordinate, destinationPosition]);

  useEffect(() => {
    const hasLocation = customStartingPoint.trim() !== '';
    if (hasLocation) {
      getCoordinate(customStartingPoint);
    }
  }, [customStartingPoint, getCoordinate]);

  useEffect(() => {
    const hasCoordinate = coordinate.lng !== '' && coordinate.lat !== '';
    if (hasCoordinate) {
      getDirection();
    }
  }, [coordinate, getDirection]);

  const handleChangeStartingPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const customLocation = event.target.value;
    if (showMessage) {
      setShowMessage(false);
    }
    setCustomStartingPoint(customLocation);
  };

  const handleStartingPoint = () => {
    const hasLocation = customStartingPoint.trim() !== '';
    if (hasLocation) {
      setShowMessage(true);
      setPolylinePath(customRoute);
    }
  };

  const elapsedTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4  w-582 p-10 z-10 text-center rounded-s">
      <LocationInput
        location={customStartingPoint}
        onChange={handleChangeStartingPoint}
        onClick={handleStartingPoint}
      />
      {showMessage && (
        <div className="p-10  rounded-s bg-white">
          {invalidKeyword === 0 ? (
            <p>잘못된 주소이거나 거리가 너무 가깝습니다</p>
          ) : (
            <p>
              {customStartingPoint}에서 {destinationName}까지 {`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`}
              걸려요💨
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
