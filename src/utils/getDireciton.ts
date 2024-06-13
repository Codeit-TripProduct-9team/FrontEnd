import instance from '@/src/api/axios';
import extractPath from '@/src/utils/extractPath';
import { BASED_URL } from '../constants/constants';

const getDirection = async (
  startPoint: { lat: number; lng: number },
  destinationPosition: { lat: number; lng: number },
) => {
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
          'Content-Type': 'application/json',
        },
      });
      const elapsedTime = response.data.routes[0].summary.duration;
      const path = extractPath(response.data);
      return { path, elapsedTime };
    } catch (error) {
      return { path: [], elapsedTime: 0 };
    }
  }
};

export default getDirection;
