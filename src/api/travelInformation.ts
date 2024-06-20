import instance from './axios';

class travelInformation {
  async getCardList() {
    return (await instance.get(`/video/sort=latest`)).data.data;
  }
  async getCarouselCardList() {
    return (await instance.get(`/video/top-liked`)).data.data;
  }
}

const travelInformationInstance = new travelInformation();

export default travelInformationInstance;
