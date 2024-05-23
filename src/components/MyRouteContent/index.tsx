import SearchBar from '../common/searchBar';
import KakaoMap from './KakaoMap';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

const DATA = ['애월 스테이 인 제주', '제주 애월해변', '몽상드애월', '하이엔드 제주'];

const PlaceList = ({ children, index }: { children: React.ReactNode; index: number }) => {
  return (
    <li className="flex justify-between rounded-8 bg-white py-15 px-15 items-center">
      <div className="flex gap-30">
        <span>{index}</span>
        {children}
      </div>
      <div className="flex justify-end gap-10">
        <PencilIcon className="w-16 h-16 text-gray-400" />
        <TrashIcon className="w-16 h-16 text-gray-400" />
      </div>
    </li>
  );
};

const MyRouteContent = () => {
  const day = 1;
  return (
    <main className="flex gap-30 bg-gray-100">
      <div>
        <KakaoMap />
        <h2>{day}일차</h2>
        <ul className="flex flex-col gap-8">
          {DATA.map((data, index) => (
            <PlaceList key={data} index={index + 1}>
              {data}
            </PlaceList>
          ))}
        </ul>
      </div>
      <div>
        <SearchBar />
      </div>
    </main>
  );
};

export default MyRouteContent;
