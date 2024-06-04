import Image from 'next/image';

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ searchValue, onChange, setSearchValue }: SearchBarProps) => {
  return (
    <div className="relative">
      <input
        value={searchValue}
        className="text-center border-1 border-gray-40 rounded-s w-700 h-40 mb-30 "
        placeholder="어느 곳으로 여행 가고싶으신가요?"
        onChange={onChange}
      />

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
          <Image src="/assets/icon/search.svg" width={17} height={17} alt="검색" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
