import { getCookie } from '../utils/cookie';
import { instance } from './axios';
const token = getCookie('accessToken');

class mainPageRequest {
  async getCardList() {
    return (await instance.get(`/video`)).data.data;
  }
  async getCarouselCardList() {
    return (await instance.get(`/video/top-liked`)).data.data;
  }
  async getRegisteredPlace(userId: number) {
    if (token) {
      return (await instance.get(`/user/${userId}/video`)).data.data;
    }
  }

  async registerMyPlace(videoId: number) {
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

  async deleteMyPlace(videoId: number, userId: number) {
    return await instance.delete(`/user/${userId}/video/${videoId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  }
}

const mainPageRequestInstance = new mainPageRequest();

export default mainPageRequestInstance;
