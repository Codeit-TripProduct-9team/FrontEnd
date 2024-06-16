import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChangeEvent, useEffect, useState } from 'react';
import { MockDataItem } from '@/src/lib/types';
// import { MockMyRouteItem } from './mockMyRoute';
// import { mockMyRoute } from './mockMyRoute';
// import { mock } from '../mainContent/mock';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import mainPageRequestInstance from '@/src/api/mainPageRequest';
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
import { useCourseStore } from '@/src/utils/zustand/useCourseStore';
import { useMyPlaceStore } from '@/src/utils/zustand/useMyPlaceStore';
import { getCookie } from '@/src/utils/cookie';
import instance from '@/src/api/axios';
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
  const filteredData: MockDataItem[] = useFilteredData({ data: myPlaceData }, searchValue);
  const courseName = useCourseStore((state) => state.data.course[0].name);
  const courseData = useCourseStore((state) => state.data);
  const flatCourseData = courseData.course[0].plan.flatMap((data) => data.place);
  const { movePlace, addPlace } = useCourseStore();

  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  useEffect(() => {
    const fetchAndLogCardList = async () => {
      try {
        const cardList = await mainPageRequestInstance.getCardList();
        setMyPlaceData(cardList);
      } catch (error) {
        console.error('Error fetching card list:', error);
      }
    };
    fetchAndLogCardList();
  }, [setMyPlaceData]);

  const coursId = 1;

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
      movePlace(coursId, parseInt(source.droppableId), fromIndex, parseInt(destination.droppableId), toIndex);
    }

    if (destination && source.droppableId === 'myPlace') {
      const card = myPlaceData.find((card) => card.title === draggableId);
      const hasDuplicate = flatCourseData.some((place) => place.name === card.title);
      if (hasDuplicate) {
        openToast.error('중복된 장소는 추가할 수 없습니다.');
        return;
      } else {
        addPlace(1, parseInt(destination.droppableId), {
          index: card.id,
          name: card.title,
          img: 'aa',
          posX: 0,
          posY: 0,
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
        <AddNearbyPlaceModal />
      </Modal>
    ));
  };

  const handleSaveCourse = async () => {
    const data = {
      name: 'course Test 1',
      plan: [
        {
          day: 1,
          place: [
            {
              index: 1,
              name: '상주 경천섬',
              description: '장소 1 description',
              img: '231',
              // img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMTlfNDkg%2FMDAxNzAwMzUzMDAwODU0.qZXyFsUAP1LdDevbe554FBmc_zoZQ3DpTuyRQEA5No0g.FpTLOCcGgZj-0EY7I6Rw1VGyCHkGLdUK03dsSLSJR5sg.JPEG.zzjworld%2F20231118%25A3%25DF152136.jpg%23900x675',
              posX: 36.44708919803324,
              posY: 128.25738736414664,
            },
            // {
            //   index: 2,
            //   name: '대구 서문시장',
            //   description: '장소 2 description',
            //   img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzExMjlfMjc5%2FMDAxNTExOTM0Mjc5MTg4.r3xrpbihNF9IEpgeuFwXqru8KHSqwH84SBlH8uktmDEg.wiW7ZvP7Y2KluqV050ojktnCYbZ4P5IEi7YesqlWLtEg.JPEG.zipoer%2F1%2529DSC06383.JPG%231600x1067',
            //   posX: 35.86957266231153,
            //   posY: 128.58221925092312,
            // },
          ],
        },
        {
          day: 2,
          place: [
            // {
            //   index: 1,
            //   name: '부산 상해 거리',
            //   description: '장소 5 description',
            //   img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20121231_299%2Fgamrae007_13569485388977VEM4_JPEG%2Fsam_8666.jpg&type=sc960_832',
            //   posX: 35.1136875,
            //   posY: 129.0379375,
            // },
            // {
            //   index: 2,
            //   name: '경기 아토믹워터파크',
            //   description: '장소 5 description',
            //   img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA2MjFfMjU5%2FMDAxNTI5NTMzMTg2MzA1.sPKX4S0yt4chIoSYPfsaogMeCxBl-5c3e68mMKBgAJwg.ivWFogTfB3fgNmrA3K8icsXjTjmOQjK8q11y1_3Gxtwg.JPEG.hong19782001%2F1529321936851.jpg&type=sc960_832',
            //   posX: 37.791082,
            //   posY: 127.51864,
            // },
          ],
        },
      ],
    };
    openToast.success(TOAST_MESSAGE.SAVE);
    try {
      const response = await instance.post('/course', data, {
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

          <KakaoMap />
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
