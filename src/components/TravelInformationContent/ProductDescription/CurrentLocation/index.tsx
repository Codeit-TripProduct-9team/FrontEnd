import { useEffect, useState } from 'react';

import convertTime from '@/src/utils/convertTime';

interface ElaspedTimeProps {
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  startPoint: { lat: number; lng: number };
}

const CurrentLocation = ({ destinationName, destinationPosition, startPoint }: ElaspedTimeProps) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const getDirection = async () => {
      const REST_API_KEY = 'cc81aff4a39ec9dc0f2227e92f473f24';
      const directionUrl = 'https://apis-navi.kakaomobility.com/v1/directions';

      const origin = `${startPoint.lng},${startPoint.lat}`;
      const destination = `${destinationPosition.lng},${destinationPosition.lat}`;

      const headers = {
        Authorization: `KakaoAK ${REST_API_KEY}`,
        'Content-Type': 'application/json',
      };

      const queryParams = new URLSearchParams({
        origin: origin,
        destination: destination,
      });

      const requestUrl = `${directionUrl}?${queryParams}`;

      try {
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: headers,
        });

        const data = await response.json();

        const elapsedTime = data.routes[0].summary.duration;
        setDuration(elapsedTime);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getDirection();
  }, [destinationPosition.lat, destinationPosition.lng, startPoint]);

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
