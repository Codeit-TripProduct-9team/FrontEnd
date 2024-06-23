import { CardDataItem } from '@/src/lib/types';
import MyRouteListCard from './MyRouteListCard';
import { useState } from 'react';
import MyRouteCardSectionPagination from './MyRouteCardSectionPagination';

interface filteredDataProps {
  filteredData: CardDataItem[];
  setSearchValue: (value: string) => void;
}

const sortMenuList = ['데이트👩‍❤️‍👨', '가족👪', '혼자😏', '산🚞', '바다🌊', '먹방🌭'];

const MyRouteCardSection = ({ filteredData, setSearchValue }: filteredDataProps) => {
  const [sort, setSort] = useState<string>('인기순');
  const [offset, setOffset] = useState(1);
  const maxOffset = Math.ceil(filteredData.length / 9);
  const paginatedData = filteredData.slice((offset - 1) * 9, offset * 9);

  const handleNextPage = () => {
    if (offset < maxOffset) {
      setOffset(offset + 1);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };

  const handleClickSortMenu = (menus: string) => {
    setSort(menus);
    if (menus === '인기순') {
      setSearchValue('');
    } else {
      menus.length <= 4 ? setSearchValue(menus.slice(0, -2)) : setSearchValue(menus.slice(0, -8));
    }
  };

  return (
    <>
      <div className="flex mb-20 justify-between">
        {sortMenuList.map((menus, index) => (
          <input
            key={index}
            className={`rounded-s h-36 min-w-110 font-bold bg-gray-10 py-5 px-15 text-15 cursor-pointer  ${
              sort === menus ? 'opacity-100' : 'opacity-50'
            }`}
            type="button"
            value={menus}
            onClick={() => handleClickSortMenu(menus)}
          />
        ))}
      </div>
      {paginatedData.length !== 0 ? (
        <>
          <div className={`grid grid-cols-3 gap-12`}>
            {paginatedData.map((data, index) => (
              <MyRouteListCard key={index} data={data} offset={offset} />
            ))}
          </div>
          {maxOffset > 1 && (
            <div className="absolute bottom-30 transform left-1/2 -translate-x-1/2">
              <MyRouteCardSectionPagination
                offset={offset}
                setOffset={setOffset}
                maxOffset={maxOffset}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <div className="mt-350 text-20 font-bold">
            <p>장소를 마이플레이스에 추가해주세요.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MyRouteCardSection;
