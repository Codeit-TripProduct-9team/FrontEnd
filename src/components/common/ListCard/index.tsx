import { MockDataItem } from '@/src/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import instance from '@/src/api/axios';

interface ListCardProps {
  data: MockDataItem;
}

const ListCard = ({ data }: ListCardProps) => {
  const router = useRouter();

  const handleClickMyPlace = () => {
    // instance.post(
    //   '/my-place',
    //   {
    //     cardId: data.cardId,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // );
    router.push('/my-route');
  };

  return (
    <div>
      <Link href={`/travel-information/${data.cardId}`}>
        <div className="flex flex-col overflow-hidden bg-white  w-290 h-290 rounded-30  transition-transform duration-300 transform hover:scale-105 cursor-pointer">
          <div className="relative  border-1 ">
            <Image src={data.thumbnail} width={300} height={300} alt="썸네일" priority className="h-180" />
          </div>
          <div className="flex flex-col justify-between p-10 h-110">
            <div>
              <h2 className="font-bold text-18 mb-5 overflow-ellipsis-2">{data.title}</h2>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-5">
                {data.tag.slice(0, 2).map((tag, index) => (
                  <div className="flex rounded-s font-bold bg-gray-10 py-3 px-10 text-12" key={index}>
                    {tag}
                  </div>
                ))}
              </div>
              <div
                className=" z-10 transition-transform duration-300 transform hover:scale-105 hover:bg-gray-30 rounded-s font-bold bg-gray-10 py-3 px-10 text-12"
                onClick={handleClickMyPlace}
              >
                마이플레이스 등록
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListCard;
