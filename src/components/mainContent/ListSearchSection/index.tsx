import { ChangeEvent, useState } from 'react';
import { mock } from '@/src/components/mainContent/mock';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import RelatedSearchInfo from './RelatedSearchInfo';
import { useRelatedSearch } from '@/src/hooks/useRelatedSearch';
import { MockDataItem } from '@/src/lib/types';

import search from '@/public/assets/icon/search.png';
import Image from 'next/image';
import CardSection from '../CardSection';

const ListSearchSection = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const filteredData: MockDataItem[] = useFilteredData({ data: mock.data }, searchValue);
  const { relatedData, visible } = useRelatedSearch(searchValue, sectionVisible);
  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };

  return (
    <article onClick={() => setSectionVisible(false)} className="flex flex-col items-center">
      <div className="mt-50 mb-30">
        <h1 className="text-center text-35 mb-10 font-bold">유튜버의 검증된 코스 그대로</h1>
        <p className="text-center text-gray-50 text-15">
          평소 좋아했던 유튜버의 여행을 그대로 따라 갈 수 있는 기회,
          <br /> 마이 플레이스 등록 후 간편하게 코스를 편집해 보세요!
        </p>
      </div>
      <div className="relative">
        <input
          value={searchValue}
          className="text-center border-1 border-gray-40 rounded-s w-700 h-60 py-10 px-30 mb-100 "
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
            {/*  VISIBLE 안으로 넣기*/}
          </div>
        )}
        <Image src={search} width={30} height={10} alt="검색이미지" className="absolute right-15 top-15" />
      </div>
      <CardSection filteredData={filteredData} setSearchValue={setSearchValue} />
    </article>
  );
};

export default ListSearchSection;
