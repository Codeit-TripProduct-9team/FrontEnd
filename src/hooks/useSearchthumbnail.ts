import { useState, useEffect } from 'react';
import instance from '../api/axios';
import { BASED_URL } from '../constants/constants';
import { videoListProps } from '../lib/types';

const useSearchThumbnail = (searchResult: videoListProps[]) => {
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const getYoutubeData = async (videoId: string) => {
    try {
      const part = 'snippet,statistics';
      const response = await instance.get(
        `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${part}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getThumbnails = async () => {
      const thumbnailsData: { [key: string]: string } = {};
      for (const { id, url } of searchResult) {
        const videoId = url.split('v=')[1];
        const data = await getYoutubeData(videoId);
        const hasData = data && data.items && data.items.length > 0;
        if (hasData) {
          const thumbnail = data.items[0].snippet.thumbnails?.high?.url;
          if (thumbnail) {
            thumbnailsData[id] = thumbnail;
          }
        }
      }
      setThumbnails(thumbnailsData);
    };

    getThumbnails();
  }, [searchResult]);

  return { thumbnails, loading };
};

export default useSearchThumbnail;
