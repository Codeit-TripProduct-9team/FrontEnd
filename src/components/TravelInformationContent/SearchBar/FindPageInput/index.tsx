import Image from 'next/image';
import SearchIcon from '@/public/assets/icon/search-header.svg';

interface SearchPageProps {
  searchKeyword: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const FindPageInput = ({ searchKeyword, onChange, onFocus, onBlur }: SearchPageProps) => {
  return (
    <div className="flex w-full pl-124 pt-18 pb-21 gap-10 border-b-1 border-black">
      <Image src={SearchIcon} width={16} height={16} alt="search" />
      <input
        className="w-full text-17 bg-transparent placeholder:text-17"
        type="text"
        placeholder="원하는 정보를 검색해 보세요!"
        value={searchKeyword}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default FindPageInput;
