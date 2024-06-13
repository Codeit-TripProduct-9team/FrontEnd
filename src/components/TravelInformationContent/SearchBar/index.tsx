import SearchPage from './SearchPage';
import SearchContent from './SearchContent';
import useSearchVideo from '@/src/hooks/useSearchVideo';

const SearchBar = () => {
  const { searchKeyword, searchResult, handleChangeKeyword, handleRouteContents } = useSearchVideo();
  const hasKeyword = searchResult.length > 0;

  return (
    <div className="relative w-full ">
      <SearchPage searchKeyword={searchKeyword} onChange={handleChangeKeyword} />
      {hasKeyword && <SearchContent searchResult={searchResult} onClick={handleRouteContents} />}
    </div>
  );
};

export default SearchBar;
