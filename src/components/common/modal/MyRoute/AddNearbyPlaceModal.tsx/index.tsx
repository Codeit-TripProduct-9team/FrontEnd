import ModalPlaceList from '../AddPlaceModal.tsx/ModalPlaceList';
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { mockMyCourse } from '@/src/components/MyRouteContent/mockMyRoute';
import Button from '../../../button';
import { useEffect, useState } from 'react';
import instance from '@/src/api/axios';

const AddNearbyPlaceModal = () => {
  const positions = mockMyCourse.coursePlan;
  const [selectedPlace, setSelectedPlace] = useState({ name: '', position: { lat: 0, lng: 0 } });
  const [mapCenter, setMapCenter] = useState(positions[0].places[0].position);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(1000);
  const [selectedQuery, setSelectedQuery] = useState('음식점');
  // const [map, setMap] = useState();
  console.log(markers);
  console.log(selectedMarker);
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
      // Call the Kakao Places API
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
      const newMarkers = data.documents.map((place) => ({
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

  // useEffect(() => {
  //   if (!map) return;
  //   window.kakao.maps.load(() => {
  //     const ps = new kakao.maps.services.Places();
  //     ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //         // LatLngBounds 객체에 좌표를 추가합니다
  //         const bounds = new kakao.maps.LatLngBounds();
  //         const markers = [];

  //         for (let i = 0; i < data.length; i++) {
  //           markers.push({
  //             position: {
  //               lat: data[i].y,
  //               lng: data[i].x,
  //             },
  //             content: data[i].place_name,
  //           });
  //           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //         }
  //         setMarkers(markers);

  //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //         map.setBounds(bounds);
  //       }
  //     });
  //   });
  // }, [map]);

  return (
    <div className="flex flex-col gap-12">
      <Map center={mapCenter} level={5} className="w-558 h-204 rounded-m shadow-md z-0">
        {markers.map((marker, index) => (
          <MapMarker
            key={`${marker.name}-${index}`}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          >
            {/* {selectedMarker === marker && (
              <div className="rounded-s flex flex-col gap-4 bg-white w-300">
                <h1 className="bg-blue text-white font-bold p-4 ">{marker.name}</h1>
                <div className="px-4 pb-4 flex flex-col gap-4">
                  <span className="text-14">{marker.roadAddress}</span>
                  <span className="text-12 text-gray-50">(지번: {marker.address})</span>
                  <span className="text-green text-12">{marker.phone}</span>
                </div>
              </div>
            )} */}
          </MapMarker>
        ))}
        <CustomOverlayMap position={selectedPlace.position} yAnchor={2}>
          <div className="relative px-6 py-3 text-white bg-blue rounded-l shadow-sub">
            <p>{selectedPlace.name}</p>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-blue border-l-8 border-l-transparent border-r-8 border-r-transparent" />
          </div>
        </CustomOverlayMap>

        {selectedMarker && (
          <CustomOverlayMap position={selectedMarker.position} yAnchor={1.5} zIndex={1}>
            <div className="relative rounded-s flex flex-col gap-4 bg-white w-300">
              <h1 className="bg-blue text-white font-bold p-6 rounded-t-s">{selectedMarker.name}</h1>
              <div className="flex flex-col px-6 pb-6">
                <span className="text-14">{selectedMarker.roadAddress}</span>
                <span className="text-12 text-gray-50">(지번: {selectedMarker.address})</span>
                <span className="text-green text-12">{selectedMarker.phone || '대표번호가 없습니다.'}</span>
              </div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-white border-white border-l-8 border-l-transparent border-r-8 border-r-transparent" />
            </div>
          </CustomOverlayMap>
        )}

        <ul className="absolute bg-white rounded-s border-1 flex gap-4 px-4">
          <li onClick={() => setSelectedQuery('음식점')}>음식점</li>
          <li className="border-l-1 border-r-1 px-4" onClick={() => setSelectedQuery('숙박')}>
            숙박
          </li>
          <li onClick={() => setSelectedQuery('관광명소')}>관광명소</li>
        </ul>
      </Map>
      <div className="flex flex-col gap-12">
        <span className="text-center text-14 text-gray-60">위치하신 곳 근방의 장소를 추천해 드려요!</span>
        <div className="flex gap-9 justify-center">
          <Button className="w-109 h-40" onClick={() => setSelectedDistance(1000)}>
            1km
          </Button>
          <Button className="w-109 h-40" onClick={() => setSelectedDistance(5000)}>
            5km
          </Button>
          <Button className="w-109 h-40" onClick={() => setSelectedDistance(10000)}>
            10km
          </Button>
        </div>
      </div>
      <ModalPlaceList data={decomposedData} className="h-150" onClick={handlePlaceClick} />
    </div>
  );
};

export default AddNearbyPlaceModal;
