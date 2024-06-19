// import { Place } from './PlaceList';
import { Draggable } from '@hello-pangea/dnd';
import bin from '@/public/assets/icon/bin.svg';
import Image from 'next/image';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore';
import { openToast } from '@/src/utils/openToast';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import { Place } from '@/src/lib/types';

type PlaceItemProps = {
  place: Place;
};

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { removePlace } = useCourseStore();
  const courseId = 1;
  const handleDeletePlace = (index: number) => {
    removePlace(courseId, index);
    openToast.success(TOAST_MESSAGE.DELETE);
  };

  return (
    <Draggable draggableId={`${place.index}-${place.name}`} index={place.index}>
      {(provided) => (
        <li
          className="w-441 h-60 flex justify-between rounded-s bg-gray-10 py-18 pl-20 pr-24 items-center shadow-main"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex gap-51">
            <span className="text-gray-50 font-bold">{place.index}</span>
            <span className="font-bold">{place.name}</span>
          </div>
          <div className="flex justify-end gap-15">
            <Image
              src={bin}
              alt="delete"
              width={15}
              height={18}
              className="cursor-pointer"
              onClick={() => handleDeletePlace(place.index)}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default PlaceItem;
