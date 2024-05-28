import { MockDataItem } from '@/src/lib/types';
import ListCard from '../../common/ListCard';
import { useState } from 'react';
import NoSearchData from './NoSearchData';

interface filteredDataProps {
  filteredData: MockDataItem[];
  setSearchValue: (value: string) => void;
}

const sortMenuList = ['인기순', '최신순', '데이트👩‍❤️‍👨', '가족👪', '혼자😏', '산🚞', '바다🌊', '먹방🌭'];

const CardSection = ({ filteredData, setSearchValue }: filteredDataProps) => {
  const [sort, setSort] = useState<string>('인기순');
  const GRID_ROW = Math.ceil(filteredData.length / 4);
  const handleClickSortMenu = (menus: string) => {
    setSort(menus);
    if (menus === '인기순' || menus === '최신순') {
      setSearchValue('');
    } else {
      setSearchValue(menus);
    }
  };
  // 리팩토링시 커스텀 훅으로 뺄것?
  return (
    <>
      <div className="flex mr-600 gap-10 mb-20">
        {sortMenuList.map((menus, idx) => (
          <input
            key={idx}
            className={`rounded-s font-bold bg-white py-5 px-15 text-15 cursor-pointer  ${
              sort === menus ? 'opacity-100' : 'opacity-50'
            }`}
            type="button"
            value={menus}
            onClick={() => handleClickSortMenu(menus)}
          />
        ))}
      </div>
      {filteredData.length !== 0 ? (
        <div className={`grid grid-cols-4 grid-rows-${GRID_ROW} gap-40`}>
          {filteredData.map((datas, index) => (
            <ListCard key={index} data={datas} />
          ))}
        </div>
      ) : (
        <NoSearchData />
      )}
    </>
  );
};

export default CardSection;
