import instance from '@/src/api/axios';
import extractPath from '@/src/utils/extractPath';
import { BASED_URL } from '../constants/constants';

const getDirection = async (
  startPoint: { lat: number; lng: number },
  destinationPosition: { lat: number; lng: number },
) => {
  const hasStartPoint = startPoint && startPoint.lat !== null && startPoint.lng !== null;
  if (hasStartPoint) {
    const headers: Record<string, string> = {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams({
      origin: `${startPoint.lng},${startPoint.lat}`,
      destination: `${destinationPosition.lng},${destinationPosition.lat}`,
    });

    const requestUrl = `${BASED_URL.KAKKAO_DIRECTION}?${queryParams}`;

    try {
      const response = await instance.get(requestUrl, { headers: headers });
      const result = await response.data;
      const elapsedTime = result.routes[0].summary.duration;
      const path = extractPath(result);
      return { path, elapsedTime };
    } catch (error) {
      console.error('Error:', error);
      return { path: [], elapsedTime: 0 };
    }
  }
};

export default getDirection;
