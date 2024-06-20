import Image from 'next/image';
import SearchIcon from '@/public/assets/icon/search-header.svg';
import { ChangeEvent } from 'react';

type searchMyCardProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};
const searchMyCard = ({ searchValue, setSearchValue }: searchMyCardProps) => {
  const handleInputChange = (event: ChangeEvent) => {
    setSearchValue((event.target as HTMLInputElement).value); // 입력값을 상태에 설정
  };
  return (
    <div className="relative w-full">
      <input
        className="w-full px-40 py-10 rounded-s"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="검색하기"
      />
      <span className="absolute top-13 left-10">
        <Image src={SearchIcon} width={16} height={16} alt="search" />
      </span>
      {searchValue && (
        <span className="absolute cursor-pointer right-20 top-18">
          <Image
            src="/assets/icon/clear.png"
            width={10}
            height={10}
            alt="클리어버튼"
            onClick={() => setSearchValue('')}
          />
        </span>
      )}
    </div>
  );
};

export default searchMyCard;
