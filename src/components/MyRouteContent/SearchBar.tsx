import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const SearchBar = ({ searchValue, onChange, setSearchValue, className }: SearchBarProps) => {
  const customStyle = twMerge('text-center border-1 border-gray-40 rounded-s w-700 h-40 mb-30', className);
  return (
    <div className="relative">
      <input
        value={searchValue}
        className={customStyle}
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
