import { useEffect, useState } from 'react';

import convertTime from '@/src/utils/convertTime';
import getDirectionRequest from '@/src/utils/getDirectionRequest';
import instance from '@/src/api/axios';

interface ElaspedTimeProps {
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  startPoint: { lat: number; lng: number };
}

const CurrentLocation = ({ destinationName, destinationPosition, startPoint }: ElaspedTimeProps) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const getDirection = async () => {
      const { requestUrl, headers } = getDirectionRequest(startPoint, destinationPosition);

      try {
        const response = await instance.get(requestUrl, {
          headers: headers,
        });

        const responseData = await response.data;
        const elapsedTime = responseData.routes[0].summary.duration;
        setDuration(elapsedTime);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getDirection();
  }, [startPoint, destinationPosition]);

  const durationTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2  w-582 p-10 z-10 text-center rounded-s bg-white">
      <p>
        현재 위치에서 {destinationName}까지 {`${durationTime.hours} 시간 ${durationTime.minutes} 분`} 걸려요💨
      </p>
    </div>
  );
};

export default CurrentLocation;
