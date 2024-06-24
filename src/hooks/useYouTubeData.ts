import { useState, useEffect } from 'react';

import { BASED_URL } from '@/src/constants/constants';
import { instance } from '@/src/api/axios';
import convertDate from '@/src/utils/convertDate';
import convertViewCount from '@/src/utils/convertViewCount';

const useYouTubeData = (videoId: string) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    if (videoId !== undefined) {
      const getYoutubeData = async () => {
        const part = 'snippet,statistics';
        const apiKeys = [
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY1,
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY2,
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY3,
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY4,
        ];

        for (let i = 0; i < apiKeys.length; i++) {
          try {
            const response = await instance.get(
              `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${apiKeys[i]}&part=${part}`,
            );
            const result = response.data.items[0];
            if (result !== undefined) {
              setViewCount(result.statistics.viewCount);
              setUpdatedAt(result.snippet.publishedAt);
              setThumbnail(result.snippet.thumbnails.high.url);
              break; // 성공적으로 데이터를 가져왔으면 반복문 종료
            }
          } catch (error) {
            if (error.response && error.response.status === 403) {
              console.error(`Error 403 with API Key ${i + 1}, trying next key...`);
              if (i === apiKeys.length - 1) {
                console.error('All API keys failed.');
              }
            } else {
              console.error('Error:', error);
              break; // 403 이외의 오류가 발생하면 반복문 종료
            }
          }
        }
      };

      getYoutubeData();
    }
  }, [videoId]);
  return { viewCount: convertViewCount(viewCount), updatedAt: convertDate(updatedAt), thumbnail: thumbnail };
};

export default useYouTubeData;
