import { VideoInformationProps } from '../lib/types';
import instance from './axios';

interface VideoInformationItem {
  data: VideoInformationProps;
}

export const getVideoInformation = async (videoId: string): Promise<VideoInformationItem> => {
  const response = await instance.get(`/video/${videoId}`);
  return response.data;
};
