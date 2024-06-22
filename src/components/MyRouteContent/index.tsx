import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChangeEvent, useEffect, useState } from 'react';
import MyRouteCardSection from './MyRouteCardSection';
import { useOverlay } from '@toss/use-overlay';
import Modal from '../common/modal';
import AddPlaceModal from './AddPlaceModal.tsx';
import SearchBar from './SearchBar';
import AddNearbyPlaceModal from './AddNearbyPlaceModal.tsx';
import Button from '../common/button';
import { openToast } from '@/src/utils/openToast';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import { useCourseStore } from '@/src/utils/zustand/useCourseStore/useCourseStore';
import { useMyPlaceStore } from '@/src/utils/zustand/useMyPlaceStore';
import { getCookie } from '@/src/utils/cookie';
import { instance } from '@/src/api/axios';
import { useRouter } from 'next/router';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import { CardDataItem } from '@/src/lib/types';
import combineVideoPlace from '@/src/api/combineVideoPlace';
// import { useRelatedSearch } from '@/src/hooks/useRelatedSearch';
// import RelatedSearchInfo from '../mainContent/ListSearchSection/RelatedSearchInfo';

const MyRouteContent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const myPlaceData = useMyPlaceStore((state) => state.data);
  const setMyPlaceData = useMyPlaceStore((state) => state.setData);
  // const { relatedData, visible } = useRelatedSearch(searchValue, sectionVisible);
  const filteredData: CardDataItem[] = useFilteredData({ data: myPlaceData }, searchValue);
  const courseName = useCourseStore((state) => state.data.name);
  const courseData = useCourseStore((state) => state.data);
  const flatCourseData = courseData.plan.flatMap((data) => data.place);
  const { movePlace, addPlace, setData } = useCourseStore();
  const userId = getCookie('userId');
  const router = useRouter();
  const { courseId } = router.query;
  const [newCourseName, setNewCourseName] = useState<string>('');

  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  // if creating new course, set data to empty
  useEffect(() => {
    if (courseId === undefined) {
      setData({ name: '', plan: [] });
    }
  }, [courseId, setData]);

  // fetch my place data and use its video id to fetch course data and combine them to create new data
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      await combineVideoPlace(userId).then((data) => setMyPlaceData(data));
    };
    fetchData();
  }, [setMyPlaceData, userId]);

  // call when dnd ends
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // if there is no destination, do nothing
    if (!destination) {
      return;
    }

    // if the destination is my place, do nothing
    if (destination.droppableId === 'myPlace') {
      return;
    }

    // if place element is moved inside course, move the place
    if (destination && source.droppableId !== 'myPlace') {
      const fromIndex = source.index;
      const toIndex = destination.index;
      movePlace(parseInt(source.droppableId), fromIndex, parseInt(destination.droppableId), toIndex);
    }

    // if place element is moved from my place to course, add the place
    if (destination && source.droppableId === 'myPlace') {
      const card = myPlaceData.find((card) => card.name === draggableId);
      const hasDuplicate = flatCourseData.some((place) => place.name === card.name);
      if (hasDuplicate) {
        openToast.error('중복된 장소는 추가할 수 없습니다.');
        return;
      } else {
        addPlace(parseInt(destination.droppableId), {
          index: 1,
          name: card.name,
          description: card.description,
          img: card.img,
          posX: card.posX,
          posY: card.posY,
        });
      }
    }
  };

  const overlay = useOverlay();
  const handleAddPlaceModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close} noClose={true} className="w-600 px-19 py-15 h-345">
        <AddPlaceModal close={close} />
      </Modal>
    ));
  };

  const handleAddNearbyPlaceModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close} noClose={true} className="w-600 px-19 py-15 h-591">
        <AddNearbyPlaceModal close={close} courseData={courseData.plan} />
      </Modal>
    ));
  };

  // save course data either by updating or creating new course
  const handleSaveCourse = async () => {
    if (courseData.plan.length === 0 || flatCourseData.length === 0) {
      openToast.error(TOAST_MESSAGE.EMPTY_COURSE);
      return;
    }

    openToast.success(TOAST_MESSAGE.SAVE);
    const updatedCourseData = { ...courseData, name: newCourseName || courseName };

    if (Number(courseId) > 0) {
      try {
        await instance.post(`/user/${userId}/course/${courseId}`, updatedCourseData, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await instance.post(`/course`, updatedCourseData, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="flex gap-30 m-30">
        <div className="bg-white py-32 pl-37 pr-55 flex flex-col gap-10 rounded-20 shadow-main">
          <div className="flex gap-12">
            <input
              onChange={(e) => setNewCourseName(e.target.value)}
              className="rounded-s w-full h-42 px-20 bg-gray-10 font-bold placeholder-gray-40"
              placeholder={`${courseName ? courseName : '여행지의 제목을 입력해주세요'}`}
            />
            <Button className="w-100 h-42 font-bold text-14" onClick={handleSaveCourse}>
              저장하기
            </Button>
          </div>

          <KakaoMap courseData={courseData.plan} />
          <div className="flex justify-end">
            <div>
              <PlaceList />

              <div className="flex gap-9">
                <button
                  className="w-216 h-60 bg-blue text-white rounded-s flex justify-center items-center font-bold"
                  onClick={() => handleAddPlaceModal()}
                >
                  직접 일정 추가하기
                </button>
                <button
                  className="w-216 h-60 bg-blue text-white rounded-s flex justify-center items-center font-bold"
                  onClick={() => handleAddNearbyPlaceModal()}
                >
                  근처 장소 추가하기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-20 px-40 py-32 relative">
          <SearchBar searchValue={searchValue} onChange={handleSearchInputChange} setSearchValue={setSearchValue} />

          <Droppable droppableId="myPlace">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <MyRouteCardSection filteredData={filteredData} setSearchValue={setSearchValue} />

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </main>
    </DragDropContext>
  );
};

export default MyRouteContent;
