import { instance } from './axios';

import { BASED_URL } from '../constants/constants';
import { getCookie } from '../utils/cookie';

class informationPageRequest {
  async getLocation(address: string) {
    return (
      await instance.get(`${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${address}`, {
        headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}` },
      })
    ).data.documents;
  }

  async getVideoList() {
    return (await instance.get(`/video`)).data.data;
  }

  async getVideoData(videoId: string) {
    return (await instance.get(`/video/${videoId}`)).data.data;
  }

  async getRegisteredPlace(userId: number) {
    return (await instance.get(`/user/${userId}/video`)).data.data;
  }

  async registerMyPlace(videoId: string) {
    return await instance.post(
      `/video/${videoId}/likes`,
      { data: null },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
  }

  async deleteMyPlace(videoId: string, userId: number) {
    return await instance.delete(`/user/${userId}/video/${videoId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  }
}

const informationPageRequestInstance = new informationPageRequest();

export default informationPageRequestInstance;
