// import { MockMyRouteItem } from '../mockMyRoute';
// import { MockDataItem } from '@/src/lib/types';
import MyRouteListCard from './MyRouteListCard';
import { useState } from 'react';
import NoSearchData from '../../mainContent/CardSection/NoSearchData';
import MyRouteCardSectionPagination from './MyRouteCardSectionPagination';
import { MyPlace } from '@/src/lib/types';

interface filteredDataProps {
  filteredData: MyPlace[];
  setSearchValue: (value: string) => void;
}

const sortMenuList = ['데이트👩‍❤️‍👨', '가족👪', '혼자😏', '산🚞', '바다🌊', '먹방🌭'];

const MyRouteCardSection = ({ filteredData, setSearchValue }: filteredDataProps) => {
  const [sort, setSort] = useState<string>('인기순');
  // const GRID_ROW = Math.ceil(filteredData.length / 4);
  const handleClickSortMenu = (menus: string) => {
    setSort(menus);
    if (menus === '인기순') {
      setSearchValue('');
    } else {
      menus.length <= 4 ? setSearchValue(menus.slice(0, -2)) : setSearchValue(menus.slice(0, -8));
    }
  };
  // 리팩토링시 커스텀 훅으로 뺄것?
  return (
    <>
      <div className="flex mb-20 justify-between">
        {sortMenuList.map((menus, idx) => (
          <input
            key={idx}
            className={`rounded-s h-36 min-w-110 font-bold bg-gray-10 py-5 px-15 text-15 cursor-pointer  ${
              sort === menus ? 'opacity-100' : 'opacity-50'
            }`}
            type="button"
            value={menus}
            onClick={() => handleClickSortMenu(menus)}
          />
        ))}
      </div>
      {filteredData.length !== 0 ? (
        <>
          <div className={`grid grid-cols-3 gap-12`}>
            {filteredData.map((data, index) => (
              <MyRouteListCard key={index} data={data} />
            ))}
          </div>
          <MyRouteCardSectionPagination />
        </>
      ) : (
        <NoSearchData />
      )}
    </>
  );
};

export default MyRouteCardSection;
