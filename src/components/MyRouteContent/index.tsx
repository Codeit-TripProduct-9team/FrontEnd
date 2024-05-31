import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { ChangeEvent, useState } from 'react';
import { MockDataItem } from '@/src/lib/types';
// import { MockMyRouteItem } from './mockMyRoute';
// import { mockMyRoute } from './mockMyRoute';
import { mock } from '../mainContent/mock';
import { useFilteredData } from '@/src/hooks/useFilteredData';
// import NoSearchData from '../mainContent/CardSection/NoSearchData';
// import { Draggable } from '@hello-pangea/dnd';
// import CardSection from '../mainContent/CardSection';
import MyRouteCardSection from './MyRouteCardSection';
import search from '@/public/assets/icon/search.svg';
import Image from 'next/image';
import { useRelatedSearch } from '@/src/hooks/useRelatedSearch';
import RelatedSearchInfo from '../mainContent/ListSearchSection/RelatedSearchInfo';

const MyRouteContent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const { relatedData, visible } = useRelatedSearch(searchValue, sectionVisible);

  // const GRID_ROW = Math.ceil(mock.data.length / 4);
  const mockSliced = mock.data.slice(0, 9);
  const filteredData: MockDataItem[] = useFilteredData({ data: mockSliced }, searchValue);
  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === 'myPlace' && source.droppableId === 'placeList') {
      console.log(`${draggableId}`);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className="flex gap-30 m-30">
        <div className="bg-white pt-32 pl-37 pr-55 pb-107 flex flex-col gap-10 rounded-20 shadow-main">
          <KakaoMap />
          <div className="flex justify-end">
            <div>
              <PlaceList />

              {/* 버튼에 모달 핸들러 등록 */}
              <button className="w-441 h-60 bg-blue text-white rounded-s flex justify-center items-center">
                + 일정 추가하기
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-20 px-40 py-20">
          <div className="relative">
            <input
              value={searchValue}
              className="text-center border-2 rounded-15 w-700 h-40 mb-30 "
              placeholder="어느 곳으로 여행 가고싶으신가요?"
              onChange={handleSearchInputChange}
            />

            {visible && (
              <div className="absolute top-50 z-10 bg-white">
                <RelatedSearchInfo
                  data={relatedData}
                  setSectionVisible={setSectionVisible}
                  setSearchValue={setSearchValue}
                />
                {/*  리팩토링 할 때 VISIBLE 안으로 넣기 - 리렌더링 방지*/}
              </div>
            )}
            <div className="absolute cursor-pointer right-23 top-13">
              {searchValue ? (
                <Image
                  src="/assets/icon/clear.png"
                  width={17}
                  height={17}
                  alt="검색어 초기화"
                  onClick={() => setSearchValue('')}
                />
              ) : (
                <Image src={search} width={17} height={17} alt="검색" />
              )}
            </div>
          </div>

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
