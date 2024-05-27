import { MockDataItem } from '@/src/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface ListCardProps {
  data: MockDataItem;
}

const ListCard = ({ data }: ListCardProps) => {
  return (
    <Link href={`/travel-information/${data.cardId}`}>
      <div className="flex flex-col  justify-between w-270 h-350 border-4 rounded-30 p-10 transition-transform duration-300 transform hover:scale-105 cursor-pointer">
        <div className="relative overflow-hidden border-1 rounded-30">
          <Image src={data.thumbnail} width={300} height={300} alt="썸네일" priority />
          <div className="absolute top-10 right-10 text-white w-fit border-2 rounded-15 text-15 p-5">
            ❤️{data.likes}
          </div>
        </div>
        <div>
          <h2 className="font-bold text-20 mb-5 overflow-ellipsis-2">{data.title}</h2>
          <p className="overflow-ellipsis-3">{data.description}</p>
        </div>
        <div className="flex">
          {data.tag.map((tag, index) => (
            <div className="flex border-2 rounded-15 p-5 text-13" key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
