import { useState } from 'react';

import LocationInput from './LocationInput';

import convertTime from '@/src/utils/convertTime';
import getDirectionRequest from '@/src/utils/getDirectionRequest';
import { BASED_URL } from '@/src/constants/constants';
import extractPath from '@/src/utils/extractPath';
import instance from '@/src/api/axios';

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
  const [customLocation, setCustomLocation] = useState('');

  const getCoordinate = async (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    try {
      const response = await instance.get(
        `${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${encodedAddress}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        },
      );
      const result = await response.data;
      const customLocation = result.documents[0];
      const coordinate = { lat: parseFloat(customLocation.y), lng: parseFloat(customLocation.x) };
      return coordinate;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getDirection = async (coordinate: { lat: number; lng: number }) => {
    const { requestUrl, headers } = getDirectionRequest(coordinate, destinationPosition);
    try {
      const response = await instance.get(requestUrl, {
        headers: headers,
      });

      const result = await response.data;
      const elapsedTime = result.routes[0].summary.duration;

      const path = extractPath(result);
      setDuration(elapsedTime);
      setInvalidKeyword(result.totalCount);
      return path;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const handleChangeStartingPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    if (showMessage) {
      setShowMessage(false);
    }
    setCustomLocation(location);
  };

  const handleStartingPoint = async () => {
    const hasLocation = customLocation.trim() !== '';
    if (hasLocation) {
      const coordinate = await getCoordinate(customLocation);
      if (coordinate) {
        const path = await getDirection(coordinate);
        setShowMessage(true);
        setPolylinePath(path);
        setCustomStartPoint(coordinate);
      }
      if (!coordinate) {
        setShowMessage(true);
        setInvalidKeyword(0);
      }
    }
  };

  const elapsedTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-582 p-10 z-10 text-center rounded-s">
      <LocationInput location={customLocation} onChange={handleChangeStartingPoint} onClick={handleStartingPoint} />
      {showMessage && (
        <div className="p-10 rounded-s bg-white">
          {invalidKeyword === 0 ? (
            <p>잘못된 주소이거나 거리가 너무 가깝습니다</p>
          ) : (
            <p>
              {customLocation}에서 {destinationName}까지 {`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`}
              걸려요💨
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
