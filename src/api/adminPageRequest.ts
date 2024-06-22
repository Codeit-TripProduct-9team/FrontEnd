import { adminInstance } from './axios';

interface formData {
  title: string;
  content: string;
  imageUrl: string;
  videoUrl: string;
  tag: string[];
  place: any;
  //   {
  //     name: string;
  //     posX: number;
  //     posY: number;
  //     description: string;
  //     img: string;
  //   },
  //   {
  //     name: string;
  //     posX: number;
  //     posY: number;
  //     description: string;
  //     img: string;
  //   },
  //   {
  //     name: string;
  //     posX: number;
  //     posY: number;
  //     description: string;
  //     img: string;
  //   },
  // ];
}

class adminPageRequest {
  async addVideo(formData: formData) {
    return await adminInstance.post(`/video`, formData);
  }
  async deleteVideo(videoId: number) {
    return await adminInstance.delete(`/video/${videoId}`);
  }
}

const adminPageRequestInstance = new adminPageRequest();

export default adminPageRequestInstance;
