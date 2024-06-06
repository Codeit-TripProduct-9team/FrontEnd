import ModalPlaceList from '../AddPlaceModal.tsx/ModalPlaceList';
import { Map } from 'react-kakao-maps-sdk';
import { mockMyRoute } from '@/src/components/MyRouteContent/mockMyRoute';
import Button from '../../../button';

const AddNearbyPlaceModal = () => {
  const positions = mockMyRoute.data;

  return (
    <div className="flex flex-col gap-12">
      <Map center={positions[0].latlng} className="w-558 h-204 rounded-m shadow-md z-0"></Map>
      <div className="flex flex-col gap-12">
        <span className="text-center text-14 text-gray-60">위치하신 곳 근방의 장소를 추천해 드려요!</span>
        <div className="flex gap-9 justify-center">
          <Button className="w-109 h-40">1km</Button>
          <Button className="w-109 h-40">5km</Button>
          <Button className="w-109 h-40">10km</Button>
        </div>
      </div>
      <ModalPlaceList data={mockMyRoute.data} className="h-150" />
    </div>
  );
};

export default AddNearbyPlaceModal;
