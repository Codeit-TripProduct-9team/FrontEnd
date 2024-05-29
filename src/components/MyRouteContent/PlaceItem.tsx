import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
// import { Place } from './PlaceList';
import { Draggable } from '@hello-pangea/dnd';

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
          className="flex justify-between rounded-8 bg-white p-15 items-center shadow-lg"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex gap-30">
            <span className="text-gray-400">{place.id}</span>
            <span className="font-bold">{place.name}</span>
          </div>
          <div className="flex justify-end gap-10">
            <PencilIcon className="w-16 h-16 text-gray-400" />
            <TrashIcon className="w-16 h-16 text-gray-400" />
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default PlaceItem;
