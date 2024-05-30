// import { Place } from './PlaceList';
import { Draggable } from '@hello-pangea/dnd';
import pencil from '@/public/assets/icon/pencil.svg';
import bin from '@/public/assets/icon/bin.svg';
import Image from 'next/image';

interface Place {
  id: number;
  name: string;
}

type PlaceItemProps = {
  place: Place;
  index: number;
};

const PlaceItem: React.FC<PlaceItemProps> = ({ place, index }) => {
  return (
    <Draggable draggableId={`${place.name}-${index}`} index={index}>
      {(provided) => (
        <li
          className="flex justify-between rounded-8 bg-gray-10 p-15 items-center shadow-lg"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex gap-30">
            <span className="text-gray-50 font-bold">{place.id}</span>
            <span className="font-bold">{place.name}</span>
          </div>
          <div className="flex justify-end gap-15">
            <Image src={pencil} alt="change" width={16} height={16} />
            <Image src={bin} alt="delete" width={15} height={18} />
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default PlaceItem;
