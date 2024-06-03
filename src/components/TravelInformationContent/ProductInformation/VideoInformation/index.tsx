import { useCallback, useEffect, useState } from 'react';

import ProductCardButton from './ProductCardButton';

import instance from '@/src/api/axios';
import convertDate from '@/src/utils/convertDate';
import convertViewCount from '@/src/utils/convertViewCount';
import { BASED_URL } from '@/src/constants/constants';

interface VideoInformationProps {
  youtubeData: {
    id: number;
    url: string;
    thumbnail: string;
    likes: number;
    title: string;
    description: string;
    youtuber: string;
    tag: string[];
  };
  videoId: string;
}

const YoutubeData = ({ youtubeData, videoId }: VideoInformationProps) => {
  const [updataedAt, setUpdatedAt] = useState('');
  const [viewCount, setViewCount] = useState(0);

  const getYoutubeData = useCallback(async () => {
    try {
      const part = 'snippet,statistics';
      const response = await instance.get(
        `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${part}`,
      );
      const result = await response.data.items[0];
      setViewCount(result.statistics.viewCount);
      setUpdatedAt(result.snippet.publishedAt);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [videoId]);

  useEffect(() => {
    getYoutubeData();
  }, [getYoutubeData]);

  return (
    <div className="flex flex-col w-full h-378 gap-24">
      <h1 className="text-28 font-bold">{youtubeData.title}</h1>
      <div className="flex flex-col gap-12 text-gray-70">
        <p className="text-20 text-gray-50">{youtubeData.description}</p>
        <p>{`조회수 ${convertViewCount(viewCount)}회 · 저장수 ${15}회 · ${convertDate(updataedAt)}`}</p>
        <ul className="flex gap-10 ">
          {youtubeData.tag.map((tag, index) => (
            <li className="flex rounded-s font-bold bg-gray-10 py-8 px-30  text-16" key={index}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow" />
      <ProductCardButton
        title={youtubeData.title}
        description={youtubeData.description}
        thumbnail={youtubeData.thumbnail}
      />
    </div>
  );
};

export default YoutubeData;
