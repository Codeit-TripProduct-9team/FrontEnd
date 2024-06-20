import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChangeEvent, useEffect, useState } from 'react';
// import { MockDataItem } from '@/src/lib/types';
// import { MockMyRouteItem } from './mockMyRoute';
// import { mockMyRoute } from './mockMyRoute';
// import { mock } from '../mainContent/mock';
// import { useFilteredData } from '@/src/hooks/useFilteredData';
// import mainPageRequestInstance from '@/src/api/mainPageRequest';
// import NoSearchData from '../mainContent/CardSection/NoSearchData';
// import { Draggable } from '@hello-pangea/dnd';
// import CardSection from '../mainContent/CardSection';
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
import instance from '@/src/api/axios';
import { userDataStore } from '@/src/utils/zustand/userDataStore';
import { useRouter } from 'next/router';
// import { MyPlaceCardData } from '@/src/lib/types';
// import { useRelatedSearch } from '@/src/hooks/useRelatedSearch';
// import RelatedSearchInfo from '../mainContent/ListSearchSection/RelatedSearchInfo';

const MyRouteContent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const myPlaceData = useMyPlaceStore((state) => state.data);
  const setMyPlaceData = useMyPlaceStore((state) => state.setData);
  // const { relatedData, visible } = useRelatedSearch(searchValue, sectionVisible);

  // const GRID_ROW = Math.ceil(mock.data.length / 4);
  // const mockSliced = mock.data.slice(0, 9);

  // const filteredData: MockDataItem[] = useFilteredData({ data: myPlaceCourseData }, searchValue);
  const courseName = useCourseStore((state) => state.data.name);
  const courseData = useCourseStore((state) => state.data);
  const flatCourseData = courseData.plan.flatMap((data) => data.place);
  console.log(flatCourseData);
  const { movePlace, addPlace } = useCourseStore();
  const { userData } = userDataStore();
  const userId = userData.id;
  const router = useRouter();
  const { courseId } = router.query;
  // const [myPlaceCardData, setMyPlaceCardData] = useState<MyPlaceCardData[]>([]);

  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  useEffect(() => {
    const fetchMyPlace = async () => {
      try {
        const videoData = await instance.get(`/user/${userId}/video`);
        console.log(videoData);
        console.log(videoData.data.data);
        const modifiedVideoData = videoData.data.data.map((item) => ({
          content: item.content,
          id: item.id,
          videoUrl: item.videoUrl,
          tags: item.tags,
          title: item.title,
        }));
        console.log('modified', modifiedVideoData);

        // setMyPlaceCardData(videoData.data.data);

        const videoId = videoData.data.data.map((item) => item.id);
        console.log(videoId);
        Promise.all(videoId.map((id) => instance.get(`/course/${id}`))).then((responses) => {
          // responses is an array of responses for each request
          const combinedData = responses.map((response, index) => {
            console.log('response.data.data:', response.data.data);
            const courseData = response.data.data.course[0];
            return {
              content: modifiedVideoData[index].content,
              id: modifiedVideoData[index].id,
              videoUrl: modifiedVideoData[index].videoUrl,
              tags: modifiedVideoData[index].tags,
              title: modifiedVideoData[index].title,
              name: courseData.name,
              img: courseData.img,
              description: courseData.description,
              posX: courseData.posX,
              posY: courseData.posY,
            };
          });
          console.log('combined', combinedData);
          setMyPlaceData(combinedData);
        });
      } catch (error) {
        console.error('Error fetching card list:', error);
      }
    };
    fetchMyPlace();
  }, [setMyPlaceData, userId]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    console.log(draggableId);
    if (!destination) {
      return;
    }

    if (destination) {
      const fromIndex = source.index;
      const toIndex = destination.index;
      console.log(fromIndex, toIndex, source.droppableId, destination.droppableId);
      movePlace(parseInt(source.droppableId), fromIndex, parseInt(destination.droppableId), toIndex);
    }

    if (destination && source.droppableId === 'myPlace') {
      console.log('myplace', myPlaceData);
      const card = myPlaceData.find((card) => card.name === draggableId);
      console.log(card);
      const hasDuplicate = flatCourseData.some((place) => place.name === card.name);
      if (hasDuplicate) {
        openToast.error('중복된 장소는 추가할 수 없습니다.');
        return;
      } else {
        //마이플레이스 데이터 나오면 수정 필요
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
        <AddPlaceModal />
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

  const handleSaveCourse = async () => {
    openToast.success(TOAST_MESSAGE.SAVE);
    try {
      const response = await instance.post(`/user/${userId}/course/${courseId}`, courseData, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="flex gap-30 m-30">
        <div className="bg-white py-32 pl-37 pr-55 flex flex-col gap-10 rounded-20 shadow-main">
          <div className="flex gap-12">
            <input
              // value={titleValue}
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

        <div className="flex flex-col bg-white rounded-20 px-40 py-32">
          <SearchBar searchValue={searchValue} onChange={handleSearchInputChange} setSearchValue={setSearchValue} />

          <Droppable droppableId="myPlace">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <MyRouteCardSection filteredData={myPlaceData} setSearchValue={setSearchValue} />

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
