import SearchBar from '../common/searchBar';
import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';
import { PlusIcon } from '@heroicons/react/24/outline';

const MyRouteContent = () => {
  return (
    <main className="flex gap-30 bg-gray-200 rounded-8">
      <div className="bg-gray-50 p-20 flex flex-col gap-10">
        <KakaoMap />
        <PlaceList />
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
