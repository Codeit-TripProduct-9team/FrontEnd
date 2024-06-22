import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface ModalPlaceListData {
  data: {
    id: number;
    mainImg: string;
    name: string;
    description?: string;
  }[];
  onClick?: (id: number) => void;
  selectedPlace?: string;
  className?: string;
}

const ModalPlaceList = ({ data, onClick, selectedPlace, className }: ModalPlaceListData) => {
  const customStyle = twMerge('flex flex-col gap-10 overflow-y-auto h-230', className);
  return (
    <div className="flex flex-col gap-30 ">
      <div className={customStyle}>
        {data.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex gap-20" onClick={() => onClick && onClick(item.id)}>
            {item.mainImg && (
              <>
                <div className="w-87 h-87 relative flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.mainImg.replace(/'/g, '')}
                    alt={item.name}
                    fill
                    className="rounded-m object-cover object-center"
                  />
                </div>
                <div className={`${selectedPlace === item.name && 'text-blue'}`}>
                  <h1 className="font-bold">{item.name}</h1>
                  {item.description && <p className="text-gray-60 text-12">{item.description}</p>}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ModalPlaceList;
