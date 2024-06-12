import instance from '@/src/api/axios';
import { BASED_URL } from '@/src/constants/constants';

const getCoordinate = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  const encodedAddress = encodeURIComponent(address);
  try {
    const response = await instance.get(
      `${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${encodedAddress}`,
      { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}` } },
    );
    const customLocation = response.data.documents[0];
    return { lat: parseFloat(customLocation.y), lng: parseFloat(customLocation.x) };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default getCoordinate;
