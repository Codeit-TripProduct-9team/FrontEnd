import { useState, useEffect } from 'react';

import instance from '@/src/api/axios';
import { BASED_URL } from '@/src/constants/constants';
import extractPath from '@/src/utils/extractPath';

const useDestinationDirection = (
  startPoint: { lat: number; lng: number },
  destinationPosition: { lat: number; lng: number },
) => {
  const [polylinePath, setPolylinePath] = useState<{ lat: number; lng: number }[]>([]);
  const [duration, setDuration] = useState(0);

  const isValidCoordinate = startPoint && startPoint.lat !== 0 && startPoint.lng !== 0;

  useEffect(() => {
    const getDestinationDirection = async () => {
      const hasStartPoint = startPoint && startPoint.lat !== null && startPoint.lng !== null;
      if (hasStartPoint) {
        const queryParams = new URLSearchParams({
          origin: `${startPoint.lng},${startPoint.lat}`,
          destination: `${destinationPosition.lng},${destinationPosition.lat}`,
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
        }
      }
    };

    if (isValidCoordinate) {
      getDestinationDirection();
    }
  }, [isValidCoordinate, startPoint, destinationPosition]);

  return { polylinePath, duration };
};

export default useDestinationDirection;
