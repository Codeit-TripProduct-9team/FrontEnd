import { useEffect, useState, useCallback } from 'react';

import convertTime from '@/src/utils/convertTime';
import getDirectionRequest from '@/src/utils/getDirectionRequest';
import extractPath from '@/src/utils/extractPath';
import instance from '@/src/api/axios';

interface ElaspedTimeProps {
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  startPoint: { lat: number; lng: number };
  setPolylinePath: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }[]>>;
}

const CurrentLocation = ({ destinationName, destinationPosition, startPoint, setPolylinePath }: ElaspedTimeProps) => {
  const [duration, setDuration] = useState(0);

  const getDirection = useCallback(async () => {
    const hasStartPoint = startPoint && startPoint.lat === null && startPoint.lng === null;
    if (!hasStartPoint) {
      const { requestUrl, headers } = getDirectionRequest(startPoint, destinationPosition);
      try {
        const response = await instance.get(requestUrl, {
          headers: headers,
        });
        const result = await response.data;
        const elapsedTime = result.routes[0].summary.duration;

        const path = extractPath(result);
        setPolylinePath(path);
        setDuration(elapsedTime);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, [destinationPosition, setPolylinePath, startPoint]);

  useEffect(() => {
    const isValidCoordinate = startPoint && startPoint.lat === 0 && startPoint.lng === 0;
    if (!isValidCoordinate) {
      getDirection();
    }
  }, [getDirection, startPoint]);

  const elapsedTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-582 p-10 z-10 text-center rounded-s bg-white">
      <p>
        현재 위치에서 {destinationName}까지 {`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`} 걸려요💨
      </p>
    </div>
  );
};

export default CurrentLocation;
