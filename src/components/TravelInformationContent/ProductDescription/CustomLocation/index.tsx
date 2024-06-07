import { useState } from 'react';

import LocationInput from './LocationInput';

import convertTime from '@/src/utils/convertTime';
import getDirection from '@/src/utils/getDireciton';
import { getCoordinate } from '@/src/utils/getCoordinate';

interface CustomLocationProps {
  duration: number;
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setPolylinePath: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }[]>>;
  setStartPoint: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}
const CustomLocation = ({
  duration,
  destinationName,
  destinationPosition,
  setDuration,
  setStartPoint,
  setPolylinePath,
}: CustomLocationProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [validKeyword, setValidKeyword] = useState(true);
  const [customLocation, setCustomLocation] = useState('');

  const hasLocation = customLocation.trim() !== '';

  const handleStartingPoint = async () => {
    if (hasLocation) {
      const coordinate = await getCoordinate(customLocation);

      if (coordinate === null) {
        setValidKeyword(false);
      }

      if (coordinate) {
        const directionData = await getDirection(coordinate, destinationPosition);
        if (directionData) {
          const { path, elapsedTime } = directionData;
          setStartPoint(coordinate);
          setDuration(elapsedTime);
          setPolylinePath(path);
          setValidKeyword(true);
        }
      }

      setShowMessage(true);
    }
  };

  const handleChangeStartingPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    if (showMessage) {
      setShowMessage(false);
    }
    setCustomLocation(location);
  };

  const elapsedTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-582 p-10 z-10 text-center rounded-s">
      <LocationInput location={customLocation} onChange={handleChangeStartingPoint} onClick={handleStartingPoint} />
      {showMessage && (
        <div className="p-10 rounded-s bg-white">
          {validKeyword ? (
            <p>
              {customLocation}에서 {destinationName}까지 {`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`}
              걸려요💨
            </p>
          ) : (
            <p>잘못된 주소이거나 거리가 너무 가깝습니다</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
