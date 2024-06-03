import { MockDataItem } from '@/src/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface ListCardProps {
  data: MockDataItem;
}

const MyRouteListCard = ({ data }: ListCardProps) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white w-225 h-225 rounded-s shadow-main transition-transform duration-300 transform hover:scale-105 cursor-pointer">
      <Link href={`/travel-information/${data.cardId}`} />
      <div className="relative  border-1 ">
        <Image src={data.thumbnail} width={225} height={140} alt="썸네일" priority />
      </div>
      <div className="flex flex-col justify-between p-10 h-110">
        <div>
          <h2 className="font-bold text-13 mb-5 overflow-ellipsis-2">{data.title}</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-5">
            {data.tag.slice(0, 2).map((tag, index) => (
              <div className="flex rounded-s font-bold bg-gray-10 py-3 px-10 text-9" key={index}>
                {tag}
              </div>
            ))}
          </div>
          <div
            className="transition-transform duration-300 transform hover:scale-105 hover:bg-gray-30 rounded-s font-bold bg-gray-10 py-3 px-10 text-8"
            // onClick={handleDeleteMyPlace}
          >
            마이플레이스 삭제
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRouteListCard;
