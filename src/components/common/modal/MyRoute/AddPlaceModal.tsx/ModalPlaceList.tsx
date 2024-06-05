import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ModalPlaceListData {
  data: {
    id: number;
    mainImg: string;
    name: string;
  }[];
  onClick?: (id: number) => void;
  className?: string;
}

const ModalPlaceList = ({ data, onClick, className }: ModalPlaceListData) => {
  const customStyle = twMerge('flex flex-col gap-10 overflow-y-auto h-230', className);
  return (
    <div className="flex flex-col gap-30 ">
      <div className={customStyle}>
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-10" onClick={() => onClick && onClick(item.id)}>
            <div className="w-87 h-87 relative">
              <Image
                src={item.mainImg}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-m"
              />
            </div>

            <p className="font-bold">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ModalPlaceList;
