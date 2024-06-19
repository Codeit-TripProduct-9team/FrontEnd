import { Map, MapMarker, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import React, { useEffect, useMemo } from 'react';
import instance from '@/src/api/axios';
import { useState } from 'react';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore/useCourseStore';

interface Guide {
  x: number;
  y: number;
}

interface Section {
  guides: Guide[];
}

interface Route {
  sections: Section[];
}

interface ResponseData {
  routes: Route[];
}

const KakaoMap = () => {
  const courseData = useCourseStore((state) => state.data.plan);
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);
  console.log(courseData);

  // memeoize the positions array so that it doesn't get recalculated on every render
  const positions = useMemo(() => {
    if (courseData.length === 0)
      return [
        {
          title: '서울',
          latlng: { lat: 37.5665, lng: 126.978 },
        },
      ];
    return courseData.flatMap((plan) =>
      plan.place.map((place) => ({
        title: place.name,
        latlng: { lat: place.posX, lng: place.posY },
      })),
    );
  }, [courseData]);

  console.log(courseData);
  console.log(positions);

  useEffect(() => {
    const data = {
      origin: {
        x: positions[0].latlng.lng,
        y: positions[0].latlng.lat,
      },
      destination: {
        x: positions[positions.length - 1].latlng.lng,
        y: positions[positions.length - 1].latlng.lat,
      },
      waypoints: positions.slice(1, positions.length - 1).map((position) => ({
        x: position.latlng.lng,
        y: position.latlng.lat,
      })),
      priority: 'RECOMMEND',
      car_fuel: 'GASOLINE',
      car_hipass: false,
      alternatives: false,
      road_details: false,
    };

    const getPath = async () => {
      try {
        const response = await instance.post<ResponseData>(
          'https://apis-navi.kakaomobility.com/v1/waypoints/directions',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}`,
            },
          },
        );
        if (response) {
          const guides = response.data.routes[0].sections
            .map((section) => {
              return section.guides.map((place) => {
                const { x, y } = place;
                return { lng: x, lat: y };
              });
            })
            .flat();
          setPath(guides);
        } else {
          console.log('error in calculating path');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPath();
  }, [positions]);

  return (
    <>
      <Map center={positions[0].latlng} level={10} className="w-460 h-288 rounded-8 shadow-md z-0">
        {positions.map((position, index) => (
          <React.Fragment key={`${index}-${position.title}`}>
            <MapMarker
              position={position.latlng}
              title={position.title}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                },
              }}
            />
            <CustomOverlayMap position={position.latlng} yAnchor={2.5}>
              <div className="relative px-6 py-3 text-white bg-blue rounded-l shadow-sub">
                <p>{position.title}</p>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-t-8 border-t-blue border-l-8 border-l-transparent border-r-8 border-r-transparent" />
              </div>
            </CustomOverlayMap>
          </React.Fragment>
        ))}

        <Polyline path={path} strokeWeight={3} strokeColor={'#34C231'} strokeOpacity={1} />
      </Map>
    </>
  );
};

export default KakaoMap;
