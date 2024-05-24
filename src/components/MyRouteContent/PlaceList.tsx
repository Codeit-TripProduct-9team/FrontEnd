import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

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

const PlaceList = () => {
  return DATA.map((data) => (
    <React.Fragment key={data.day}>
      <h2>{data.day}일차</h2>
      <ul className="flex flex-col gap-8">
        {/* <span>{index}</span> */}
        {data.places.map((place) => (
          <li key={place.id} className="flex justify-between rounded-8 bg-white p-15 items-center">
            {place.name}
            <div className="flex justify-end gap-10">
              <PencilIcon className="w-16 h-16 text-gray-400" />
              <TrashIcon className="w-16 h-16 text-gray-400" />
            </div>
          </li>
        ))}
      </ul>
    </React.Fragment>
  ));
};

export default PlaceList;
