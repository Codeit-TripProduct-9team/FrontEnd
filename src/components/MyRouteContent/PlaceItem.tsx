import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Place } from './PlaceList';

const PlaceItem = ({ place }: Place) => {
  return (
    <li className="flex justify-between rounded-8 bg-white p-15 items-center">
      <div className="flex gap-30">
        <span className="text-gray-400">{place.id}</span>
        <span className="font-bold">{place.name}</span>
      </div>
      <div className="flex justify-end gap-10">
        <PencilIcon className="w-16 h-16 text-gray-400" />
        <TrashIcon className="w-16 h-16 text-gray-400" />
      </div>
    </li>
  );
};
export default PlaceItem;
