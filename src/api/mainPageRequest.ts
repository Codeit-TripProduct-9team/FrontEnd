import instance from './axios';

class mainPageRequest {
  async getCardList() {
    return (await instance.get(`/video`)).data.data;
  }
  async getCarouselCardList() {
    return (await instance.get(`/video/top-liked`)).data.data;
  }
}

const mainPageRequestInstance = new mainPageRequest();

export default mainPageRequestInstance;
