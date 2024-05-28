import Image from 'next/image';
import { MockDataItem } from '@/src/lib/types';
import React from 'react';
import Link from 'next/link';

interface CarouselCardProps {
  data: MockDataItem;
}

const CarouselCard = ({ data }: CarouselCardProps) => {
  return (
    <Link href={`/travel-information/${data.cardId}`}>
      <div className="flex flex-shrink-0 bg-white gap-20 p-20 border-3 rounded-l cursor-pointer ">
        <div className="flex relative justify-center align-middle flex-col gap-10">
          <Image src={data.thumbnail} width={700} height={700} className="rounded-l " alt="썸네일 이미지" />
        </div>
        <div className="flex flex-col justify-between max-w-670">
          <div className="flex flex-col gap-30">
            <h2 className="text-36 font-bold">{data.title}</h2>
            <p className="text-25 text-gray-60">{data.description}</p>
            <p className="text-20 text-gray-70">조회수 영상생성일</p>
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
  );
};

export default CarouselCard;
