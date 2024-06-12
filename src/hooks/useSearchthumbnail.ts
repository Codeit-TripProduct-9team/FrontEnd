import { useState, useEffect } from 'react';
import instance from '../api/axios';
import { BASED_URL } from '../constants/constants';
import { videoListProps } from '../lib/types';

const useSearchThumbnail = (searchResult: videoListProps[]) => {
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

  const getYoutubeData = async (videoId: string | undefined) => {
    const part = 'snippet,statistics';
    const response = await instance.get(
      `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${part}`,
    );
    return response.data;
  };

  useEffect(() => {
    const fetchThumbnails = async () => {
      const thumbnailsData: { [key: string]: string } = {};
      for (const { id, url } of searchResult) {
        const videoId = url.split('v=')[1];
        const data = await getYoutubeData(videoId);
        const thumbnail = data.items[0].snippet.thumbnails.high.url;
        if (thumbnail) {
          thumbnailsData[id] = thumbnail;
        }
      }
      setThumbnails(thumbnailsData);
    };

    fetchThumbnails();
  }, [searchResult]);
  return thumbnails;
};

export default useSearchThumbnail;
