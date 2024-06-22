import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Button from '../../common/button';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore/useCourseStore';

interface ModalPlaceListData {
  data: {
    id: number;
    img: string;
    name: string;
    description?: string;
  }[];
  hasAddPlace?: boolean;
  close?: () => void;
  onClick?: (id: number) => void;
  selectedPlace?: string;
  className?: string;
}

const ModalPlaceList = ({ data, onClick, selectedPlace, hasAddPlace, close, className }: ModalPlaceListData) => {
  const customStyle = twMerge('flex flex-col gap-10 overflow-y-auto h-230', className);
  const { addPlace, addDay } = useCourseStore();
  const courseData = useCourseStore((state) => state.data.plan);

  const handleAddPlace = (place) => {
    if (courseData.length === 0) {
      const newDay = { day: 1, place: [] };
      addDay(newDay);
    }
    const newPlace = {
      name: place.name,
      index: 1,
      description: place.description,
      img: place.img,
      posX: place.posX,
      posY: place.posY,
    };

    addPlace(1, newPlace);
    close();
  };
  return (
    <div className="flex flex-col gap-30 ">
      <div className={customStyle}>
        {data.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex gap-20" onClick={() => onClick && onClick(item.id)}>
            {item.img && (
              <>
                <div className="w-87 h-87 relative flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.img.replace(/'/g, '')}
                    alt={item.name}
                    fill
                    className="rounded-m object-cover object-center"
                  />
                </div>
                <div className={`pr-20 flex flex-col gap-10 ${selectedPlace === item.name && 'text-blue'}`}>
                  <div className="flex justify-between">
                    <h1 className="font-bold">{item.name}</h1>
                    {hasAddPlace && (
                      <Button className="w-100 h-26 text-14" onClick={() => handleAddPlace(item)}>
                        일정에 추가하기
                      </Button>
                    )}
                  </div>
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
