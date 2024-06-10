import ModalPlaceList from '../AddPlaceModal.tsx/ModalPlaceList';
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { mockMyCourse } from '@/src/components/MyRouteContent/mockMyRoute';
import { useEffect, useState } from 'react';
import instance from '@/src/api/axios';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import CategoryList from './CategoryList';
import DistanceButton from './DistanceButton';

type Marker = {
  position: { lat: number; lng: number };
  name: string;
  address: string;
  roadAddress: string;
  url: string;
  phone: string;
  distance: string;
};

type SearchedPlace = {
  y: number;
  x: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  place_url: string;
  phone: string;
  distance: string;
};

const AddNearbyPlaceModal = () => {
  const positions = mockMyCourse.coursePlan;
  const [selectedPlace, setSelectedPlace] = useState({ name: '', position: { lat: 0, lng: 0 } });
  const [mapCenter, setMapCenter] = useState(positions[0].places[0].position);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Marker>();
  const [selectedDistance, setSelectedDistance] = useState(1000);
  const [selectedQuery, setSelectedQuery] = useState('음식점');

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

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await instance.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?y=${selectedPlace.position.lat}&x=${selectedPlace.position.lng}&radius=${selectedDistance}&query=${selectedQuery}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}`,
          },
        },
      );
      console.log(data);

      // Create a marker for each place
      const newMarkers = data.documents.map((place: SearchedPlace) => ({
        position: { lat: place.y, lng: place.x },
        name: place.place_name,
        address: place.address_name,
        roadAddress: place.road_address_name,
        url: place.place_url,
        phone: place.phone,
        distance: place.distance,
      }));

      // Add the new markers to the map
      setMarkers(newMarkers);
    };
    fetchPlaces();
  }, [selectedDistance, selectedPlace, selectedQuery]);

  return (
    <div className="flex flex-col gap-12">
      <Map center={mapCenter} level={5} className="w-558 h-304 rounded-m shadow-md z-0 relative">
        {markers.map((marker, index) => (
          <MapMarker
            key={`${marker.name}-${index}`}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
        <CustomOverlayMap position={selectedPlace.position} yAnchor={2}>
          <div className="relative px-6 py-3 text-white bg-blue rounded-l shadow-sub">
            <p>{selectedPlace.name}</p>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-blue border-l-8 border-l-transparent border-r-8 border-r-transparent" />
          </div>
        </CustomOverlayMap>

        {selectedMarker && (
          <CustomOverlayMap position={selectedMarker.position} yAnchor={1.5} zIndex={2} clickable={true}>
            <div className="relative rounded-s flex flex-col gap-4 bg-white w-300">
              <div className="bg-blue text-white font-bold p-6 rounded-t-s flex justify-between items-center">
                <h1>{selectedMarker.name}</h1>

                <a href={`${selectedMarker.url}`} target="_blank" rel="noopener noreferrer">
                  <ChevronRightIcon className="w-20" />
                </a>
              </div>
              <div className="flex flex-col px-6 pb-6">
                <span className="text-14">{selectedMarker.roadAddress}</span>
                <span className="text-12 text-gray-50">(지번: {selectedMarker.address})</span>
                <div className="flex justify-between items-center">
                  <span className="text-green text-12">{selectedMarker.phone || '대표번호가 없습니다.'}</span>
                  <span className="bg-blue rounded-s text-white text-12 px-6 py-2">일정에 추가</span>
                </div>
              </div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-white border-white border-l-8 border-l-transparent border-r-8 border-r-transparent" />
            </div>
          </CustomOverlayMap>
        )}

        <CategoryList setSelectedQuery={setSelectedQuery} selectedQuery={selectedQuery} />
        <DistanceButton selectedDistance={selectedDistance} setSelectedDistance={setSelectedDistance} />
      </Map>
      <div className="flex flex-col gap-12">
        <span className="text-center text-14 text-gray-60">위치하신 곳 근방의 장소를 추천해 드려요!</span>
      </div>
      <ModalPlaceList
        data={decomposedData}
        className="h-190"
        onClick={handlePlaceClick}
        selectedPlace={selectedPlace.name}
      />
    </div>
  );
};

export default AddNearbyPlaceModal;
