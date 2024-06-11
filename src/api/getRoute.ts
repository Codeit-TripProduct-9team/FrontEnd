import instance from './axios';
import { BASED_URL } from '../constants/constants';

export const getDestiantionRoute = async (
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
    const response = await instance.get(requestUrl, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}`,
      },
    });
    return response.data;
  }
};
