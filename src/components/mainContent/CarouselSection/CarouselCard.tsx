import { MockDataItem } from '@/src/lib/types';
import React from 'react';
import Link from 'next/link';
import YoutubePlayer from '../../TravelInformationContent/ProductInformation/YoutubePlyaer';
import useYouTubeData from '@/src/hooks/useYouTubeData';

interface CarouselCardProps {
  data: MockDataItem;
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  const videoId = data.url.split('v=')[1];
  const { viewCount, updatedAt } = useYouTubeData(videoId);

  return (
    <div>
      <Link href={`/travel-information/${data.cardId}`}>
        <div className="flex flex-shrink-0 bg-white gap-20 p-20 border-3 rounded-l cursor-pointer ">
          <div className="flex  align-middle flex-col z-10">
            <YoutubePlayer videoId={videoId} />
          </div>
          <div className="flex flex-col justify-between max-w-670">
            <div className="flex flex-col gap-30">
              <h2 className="text-36 font-bold">{data.title}</h2>
              <p className="text-25 text-gray-60">{data.description}</p>
              <div className="text-20 flex gap-20 text-gray-70">
                <p className="text-20 text-gray-70">조회수 : {viewCount}</p>{' '}
                <p className="text-20 text-gray-70">영상생성일 : {updatedAt}</p>
              </div>
            </div>
            <div className="flex gap-10 ">
              {data.tag.map((tag, index) => (
                <div className="flex rounded-s font-bold bg-gray-10 py-8 px-30 text-20 " key={index}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarouselCard;
