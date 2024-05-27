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
      <div className="flex flex-shrink-0 bg-white gap-20 p-10 border-3 rounded-10 cursor-pointer ">
        <div className="flex relative justify-center align-middle flex-col gap-10">
          <Image src={data.thumbnail} width={700} height={700} alt="썸네일 이미지" />
          <div className="absolute top-10 right-20 text-white w-fit border-2 rounded-15 text-15 p-5">
            ❤️{data.likes}
          </div>
        </div>
        <div className="flex flex-col justify-between max-w-500">
          <h2 className="text-25 font-bold">{data.title}</h2>
          <p className="text-19">{data.description}</p>
          <div className="flex gap-10 ">
            {data.tag.map((tag, index) => (
              <div className="flex border-2 rounded-15 p-5 " key={index}>
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
