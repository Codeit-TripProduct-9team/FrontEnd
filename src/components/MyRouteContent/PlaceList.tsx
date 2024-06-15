import React from 'react';
import PlaceItem from './PlaceItem';
import { Droppable } from '@hello-pangea/dnd';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore';

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
  const courseData = useCourseStore((state) => state.data.course[0].plan);

  return (
    <div className="relative mb-20 overflow-y-auto h-460 scrollbar-hide">
      <div className="border-l-2 absolute top-10 -left-20 border-gray-60 border-dashed h-[92%]" />
      {courseData.map((data) => (
        <div key={data.day} className="my-20 relative">
          <div className="w-10 h-10 bg-gray-60 rounded-full absolute -left-24 top-5" />
          <h2 className="font-bold mb-12">{data.day}일차</h2>
          <Droppable droppableId={data.day.toString()}>
            {(provided) => (
              <ul className="flex flex-col gap-12" ref={provided.innerRef} {...provided.droppableProps}>
                {data.place.map((place) => (
                  <PlaceItem key={place.name} place={place} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
      <div className="flex justify-center items-center relative text-12 text-gray-50 w-441 h-60 border-1 rounded-s border-dashed border-gray-40">
        <div className="w-10 h-10 bg-gray-60 rounded-full absolute -left-25 top-20" />
        드래그앤 드랍으로 마음에 드는 여행지를 내 계획에 포함해보세요
      </div>
    </div>
  );
};

export default PlaceList;
