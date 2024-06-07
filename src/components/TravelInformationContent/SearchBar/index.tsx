import { useRouter } from 'next/router';
import useSearch from '@/src/hooks/useSearch';
import { mock } from '../../mainContent/mock';
import SearchInput from './SearchInput';
import SearchContent from './SearchContent/indext';

const SearchBar = () => {
  const { searchKeyword, searchResult, handleChangeKeyword, setSearchKeyword } = useSearch(mock);

  const router = useRouter();

  const handleRouteContents = (cardId: number) => {
    const contentLink = `/travel-information/${cardId}`;
    router.push(contentLink);
    setSearchKeyword('');
  };

  return (
    <div className="relative w-full ">
      <SearchInput searchKeyword={searchKeyword} onChange={handleChangeKeyword} />
      {searchResult.length > 0 && <SearchContent searchResult={searchResult} onClick={handleRouteContents} />}
    </div>
  );
};

export default SearchBar;
