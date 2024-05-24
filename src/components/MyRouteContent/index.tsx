import SearchBar from '../common/searchBar';
import KakaoMap from './KakaoMap';
import PlaceList from './PlaceList';

const MyRouteContent = () => {
  return (
    <main className="flex gap-30 bg-gray-200 rounded-8">
      <div className="bg-gray-50 p-20">
        <KakaoMap />
        <PlaceList />
      </div>
      <div>
        <SearchBar />
      </div>
    </main>
  );
};

export default MyRouteContent;
