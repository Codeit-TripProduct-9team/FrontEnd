import { VideoInformationProps } from '@/src/lib/types';
import ProductCardButton from './ProductCardButton';

import useYouTubeData from '@/src/hooks/useYouTubeData';

interface YoutubeDataProps {
  youtubeData: VideoInformationProps | null;
  youtubeId: string;
}

const YoutubeData = ({ youtubeData, youtubeId }: YoutubeDataProps) => {
  const { viewCount, updatedAt, thumbnail } = useYouTubeData(youtubeId);

  return (
    <div className="flex flex-col min-w-800 w-full h-378 gap-24">
      <h1 className="text-28 font-bold">{youtubeData?.title}</h1>
      <div className="flex flex-col gap-12 text-gray-70">
        <p className="text-20 text-gray-50">{youtubeData?.content}</p>
        <p>{`조회수 ${viewCount}회 · 저장수 ${youtubeData?.likeCount}회 · ${updatedAt}`}</p>
        <ul className="flex gap-10">
          {youtubeData?.tags &&
            youtubeData.tags.map((tag: string, index: number) => (
              <li className="flex rounded-s font-bold bg-gray-10 py-8 px-30  text-16" key={index}>
                {tag}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex-grow" />
      <ProductCardButton title={youtubeData?.title} description={youtubeData?.content} thumbnail={thumbnail} />
    </div>
  );
};

export default YoutubeData;
