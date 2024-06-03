import ProductCardButton from './ProductCardButton';

import useYouTubeData from '@/src/hooks/useYouTubeData';

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
  const { viewCount, updatedAt } = useYouTubeData(videoId);

  return (
    <div className="flex flex-col w-full h-378 gap-24">
      <h1 className="text-28 font-bold">{youtubeData.title}</h1>
      <div className="flex flex-col gap-12 text-gray-70">
        <p className="text-20 text-gray-50">{youtubeData.description}</p>
        <p>{`조회수 ${viewCount}회 · 저장수 ${15}회 · ${updatedAt}`}</p>
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
