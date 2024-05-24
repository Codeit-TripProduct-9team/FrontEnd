import SearchBar from '../common/searchBar';
import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { PlusIcon } from '@heroicons/react/24/outline';

const MyRouteContent = () => {
  return (
    <main className="flex gap-30 m-30">
      <div className="bg-gray-50 pt-20 pb-50 px-30 flex flex-col gap-10 rounded-8 ">
        <KakaoMap />
        <PlaceList />

        {/* 버튼에 모달 핸들러 등록 */}
        <button className="w-full bg-blue-500 text-white rounded-8 p-15 flex justify-center items-center">
          <PlusIcon className="w-20" />
          일정 추가하기
        </button>
      </div>
      <div>
        <SearchBar />
      </div>
    </main>
  );
};

export default MyRouteContent;
