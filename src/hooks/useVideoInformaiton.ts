import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { VideoInformationProps } from '../lib/types';
import instance from '../api/axios';

const useVideoInformaiton = () => {
  const [youtubeData, setYoutubeData] = useState<VideoInformationProps | null>(null);

  const route = useRouter();
  const videoId = route.query.id as string;

  useEffect(() => {
    if (videoId !== undefined) {
      const getVideoInformation = async () => {
        try {
          const response = await instance.get(`/video/${videoId}`);
          const result = response.data.data;
          setYoutubeData(result);
        } catch (error) {
          console.error(error);
        }
      };
      getVideoInformation();
    }
  }, [videoId]);

  return youtubeData;
};

export default useVideoInformaiton;
