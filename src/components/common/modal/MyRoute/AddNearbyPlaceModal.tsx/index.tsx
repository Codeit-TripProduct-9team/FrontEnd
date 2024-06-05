import ModalPlaceList from '../AddPlaceModal.tsx/ModalPlaceList';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { mockMyCourse } from '@/src/components/MyRouteContent/mockMyRoute';
import Button from '../../../button';
import { useState } from 'react';

const AddNearbyPlaceModal = () => {
  const positions = mockMyCourse.coursePlan;
  const [selectedPlace, setSelectedPlace] = useState({ name: '', position: { lat: 0, lng: 0 } });
  const [mapCenter, setMapCenter] = useState(positions[0].places[0].position);

  const decomposedData = mockMyCourse.coursePlan
    .map((plan) => {
      return plan.places.map((place) => {
        const { id, name, mainImg, position } = place;
        return { id, name, mainImg, position };
      });
    })
    .flat();

  const handlePlaceClick = (id: number) => {
    const place = decomposedData.find((place) => place.id === id);
    if (place) {
      setSelectedPlace({ name: place.name, position: place.position });
      setMapCenter(place.position);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <Map center={mapCenter} className="w-558 h-204 rounded-m shadow-md z-0">
        <CustomOverlayMap position={selectedPlace.position} yAnchor={2}>
          <div className="relative px-6 py-3 text-white bg-blue rounded-l shadow-sub">
            <p>{selectedPlace.name}</p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-blue border-l-8 border-l-transparent border-r-8 border-r-transparent" />
          </div>
        </CustomOverlayMap>
      </Map>
      <div className="flex flex-col gap-12">
        <span className="text-center text-14 text-gray-60">위치하신 곳 근방의 장소를 추천해 드려요!</span>
        <div className="flex gap-9 justify-center">
          <Button className="w-109 h-40">1km</Button>
          <Button className="w-109 h-40">5km</Button>
          <Button className="w-109 h-40">10km</Button>
        </div>
      </div>
      <ModalPlaceList data={decomposedData} className="h-150" onClick={handlePlaceClick} />
    </div>
  );
};

export default AddNearbyPlaceModal;
