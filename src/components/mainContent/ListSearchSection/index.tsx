import { ChangeEvent, useState } from 'react';
import ListCard from '../../common/ListCard';
import { mock } from '@/src/components/mainContent/mock';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import RelatedSearchInfo from './RelatedSearchInfo';
import { useRelatedSearch } from '@/src/hooks/useRelatedSearch';
import { MockDataItem } from '@/src/lib/types';

const ListSearchSection = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const GRID_ROW = Math.ceil(mock.data.length / 4);
  const filteredData: MockDataItem[] = useFilteredData({ data: mock.data }, searchValue);
  const { relatedData, visible } = useRelatedSearch(searchValue, sectionVisible);
  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  console.log(searchValue);

  return (
    <article className="flex flex-col items-center">
      <div className="mb-20">
        <h1 className="text-center text-40 font-bold">검색유도문구</h1>
        <p className="text-center text-20">description</p>
      </div>
      <div className="relative">
        <input
          value={searchValue}
          className="text-center border-2 rounded-15 w-800 py-10 px-30 mb-30 "
          placeholder="원하는여행지, 유튜버, 테마를 검색해보세요"
          onChange={handleSearchInputChange}
        />
        {visible && (
          <div className="absolute top-50 z-10">
            <RelatedSearchInfo
              data={relatedData}
              setSectionVisible={setSectionVisible}
              setSearchValue={setSearchValue}
            />
          </div>
        )}
      </div>
      {/*  VISIBLE 안으로 넣기*/}

      <div className={`grid grid-cols-4 grid-rows-${GRID_ROW} gap-40`}>
        {filteredData.map((datas, index) => (
          <ListCard key={index} data={datas} />
        ))}
      </div>
    </article>
  );
};

export default ListSearchSection;
