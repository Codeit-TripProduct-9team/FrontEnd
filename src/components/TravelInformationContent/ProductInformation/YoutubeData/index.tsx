import { useEffect, useState } from 'react';

import instance from '@/src/api/axios';
import convertDate from '@/src/utils/convertDate';
import convertViewCount from '@/src/utils/convertViewCount';

const YoutubeData = ({ videoId }: { videoId: string }) => {
  const [updataedAt, setUpdatedAt] = useState('');
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const getYoutubeData = async () => {
      try {
        const response = await instance.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet,statistics`,
        );
        const responseData = await response.data;
        setViewCount(responseData.items[0].statistics.viewCount);
        setUpdatedAt(responseData.items[0].snippet.publishedAt);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getYoutubeData();
  }, [videoId]);

  return <div>{`조회수 ${convertViewCount(viewCount)}회 · 저장수 ${15}회 · ${convertDate(updataedAt)}`}</div>;
};

export default YoutubeData;
