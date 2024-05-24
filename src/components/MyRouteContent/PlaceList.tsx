import React from 'react';
import PlaceItem from './PlaceItem';

//맵에 표시할 때 좌표값 필요
const DATA = [
  {
    day: 1,
    places: [
      { id: 1, name: '애월 스테이 인 제주' },
      { id: 2, name: '제주 애월해변' },
    ],
  },
  {
    day: 2,
    places: [
      { id: 3, name: '몽상드애월' },
      { id: 4, name: '하이엔드 제주' },
    ],
  },
];

export type PlaceList = {
  day: number;
  places: Place[];
};

export type Place = {
  place: {
    id: number;
    name: string;
  };
};

const PlaceList = () => {
  return DATA.map((data) => (
    <React.Fragment key={data.day}>
      <h2 className="font-bold">{data.day}일차</h2>
      <ul className="flex flex-col gap-8">
        {data.places.map((place) => (
          <PlaceItem key={place.id} place={place} />
        ))}
      </ul>
    </React.Fragment>
  ));
};

export default PlaceList;
