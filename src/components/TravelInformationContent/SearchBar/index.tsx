import FindPageInput from './FindPageInput';
import SearchContent from './SearchContent';
import useSearchVideo from '@/src/hooks/useSearchVideo';
import useFocusOutClose from '@/src/hooks/useFocusOutClose';

const SearchBar = () => {
  const { searchKeyword, searchResult, handleChangeKeyword, handleRouteContents } = useSearchVideo();
  const { isFocused, handleFocus, handleBlur } = useFocusOutClose();
  const showSerachContent = isFocused && searchResult.length > 0;

  return (
    <section className="relative w-full ">
      <FindPageInput
        searchKeyword={searchKeyword}
        onChange={handleChangeKeyword}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showSerachContent && <SearchContent searchResult={searchResult} onClick={handleRouteContents} />}
    </section>
  );
};

export default SearchBar;
