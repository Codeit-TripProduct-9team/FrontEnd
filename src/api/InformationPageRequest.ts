import instance from './axios';
import { BASED_URL } from '../constants/constants';

class informationPageRequest {
  async getLocation(address: string) {
    return (
      await instance.get(`${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${address}`, {
        headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}` },
      })
    ).data.documents;
  }
}

const informationPageRequestInstance = new informationPageRequest();

export default informationPageRequestInstance;
