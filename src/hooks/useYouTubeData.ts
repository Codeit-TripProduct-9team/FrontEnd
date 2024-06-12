import { BASED_URL } from '@/src/constants/constants';
import instance from '@/src/api/axios';
import { useCallback, useState, useEffect } from 'react';
import convertDate from '@/src/utils/convertDate';
import convertViewCount from '@/src/utils/convertViewCount';

const useYouTubeData = (videoId: string) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');

  const getYoutubeData = useCallback(async () => {
    try {
      const part = 'snippet,statistics';
      const response = await instance.get(
        `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${part}`,
      );
      const result = response.data.items[0];
      setViewCount(result.statistics.viewCount);
      setUpdatedAt(result.snippet.publishedAt);
      setThumbnail(result.snippet.thumbnails.default.url);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [videoId]);

  useEffect(() => {
    getYoutubeData();
  }, [getYoutubeData]);

  return { viewCount: convertViewCount(viewCount), updatedAt: convertDate(updatedAt), thumbnail: thumbnail };
};

export default useYouTubeData;
