import React from 'react';
import PlaceItem from './PlaceItem';
import { Droppable } from '@hello-pangea/dnd';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore/useCourseStore';
import { openToast } from '@/src/utils/openToast';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { useOverlay } from '@toss/use-overlay';
import Modal from '../common/modal';
import ConfirmModal from '../common/modal/ConfirmModal';
import { MODAL_MESSAGE } from '@/src/constants/constants';

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
  const { addDay, removeDay } = useCourseStore();
  const courseId = 1;
  const handleAddDay = () => {
    const maxDay = 7;
    const newDay = { day: courseData.length + 1, place: [] };

    if (courseData.length >= maxDay) {
      openToast.error('최대 7일까지만 추가할 수 있습니다.');
    } else {
      addDay(courseId, newDay);
    }
  };

  const handleDeleteDay = (day: number) => {
    OnModal(() => removeDay(courseId, day));
  };

  const overlay = useOverlay();

  const OnModal = (callback: () => void) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ConfirmModal
          onConfirm={() => callback()}
          onCancel={close}
          header={MODAL_MESSAGE.CONFIRM_DELETE.header}
          text={MODAL_MESSAGE.CONFIRM_DELETE.text}
        />
      </Modal>
    ));
  };

  return (
    <div className="relative mb-20 overflow-y-auto h-460 scrollbar-hide">
      <div className="flex justify-center items-center text-12 text-gray-50 rounded-s mt-10">
        드래그앤 드랍으로 마음에 드는 여행지를 내 계획에 포함해보세요
      </div>
      <div className="border-l-2 absolute top-10 -left-20 border-gray-60 border-dashed h-[92%]" />
      {courseData.map((data) => (
        <div key={data.day} className="my-20 relative">
          <div className="w-10 h-10 bg-gray-60 rounded-full absolute -left-24 top-5" />
          <div className="flex items-center gap-10 mb-12">
            <h2 className="font-bold">{data.day}일차</h2>
            <XCircleIcon
              width={18}
              height={18}
              className="cursor-pointer text-gray-50"
              onClick={() => handleDeleteDay(data.day)}
            />
          </div>
          <Droppable droppableId={data.day.toString()}>
            {(provided) => (
              <ul className="flex flex-col gap-12 min-h-60" ref={provided.innerRef} {...provided.droppableProps}>
                {data.place.map((place) => (
                  <PlaceItem key={place.name} place={place} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
      <div
        className="flex justify-center items-center relative text-14 text-gray-50 w-441 h-60 border-1 rounded-s border-dashed border-gray-40 cursor-pointer"
        onClick={handleAddDay}
      >
        <div className="w-10 h-10 bg-gray-60 rounded-full absolute -left-25 top-20" />
        일차 추가하기 +
      </div>
    </div>
  );
};

export default PlaceList;
