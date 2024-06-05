import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ModalPlaceListData {
  data: {
    cardId: number;
    thumbnail: string;
    title: string;
  }[];
  className?: string;
}

const ModalPlaceList = ({ data, className }: ModalPlaceListData) => {
  const customStyle = twMerge('flex flex-col gap-10 overflow-y-auto h-230', className);
  return (
    <div className="flex flex-col gap-30 ">
      <div className={customStyle}>
        {data.map((item) => (
          <div key={item.cardId} className="flex items-center gap-10">
            <div className="w-87 h-87 relative">
              <Image
                src={item.thumbnail}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-m"
              />
            </div>

            <p className="font-bold">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ModalPlaceList;
