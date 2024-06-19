import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import RelatedSearchInfo from './RelatedSearchInfo';
import { useRelatedSearch } from '@/src/hooks/useRelatedSearch';
import { MockDataItem } from '@/src/lib/types';
import { useInView } from 'react-intersection-observer';

import search from '@/public/assets/icon/search.png';
import Image from 'next/image';
import CardSection from '../CardSection';
import InputNavigator from './InputNavigator';
import mainPageRequestInstance from '@/src/api/mainPageRequest';

const ListSearchSection = () => {
  const [cardData, setCardData] = useState([]);
  const [ref, inView] = useInView({ threshold: 0 });
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sectionVisible, setSectionVisible] = useState<boolean>(false);
  const filteredData: MockDataItem[] = useFilteredData({ data: cardData }, searchValue);
  const { relatedData, visible } = useRelatedSearch(searchValue, sectionVisible);
  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
    if (!sectionVisible) {
      setSectionVisible(true);
    }
  };
  const handleClickFloat = () => {
    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchAndLogCardList = async () => {
      try {
        const cardList = await mainPageRequestInstance.getCardList();
        setCardData(cardList);
      } catch (error) {
        console.error('Error fetching card list:', error);
      }
    };
    fetchAndLogCardList();
  }, []);

  return (
    <article onClick={() => setSectionVisible(false)} className="flex flex-col items-center">
      <div
        className=" mb-20"
        ref={(node) => {
          inputRef.current = node;
        }}
      >
        <h1 className="text-center text-35 mb-10 font-bold">유튜버의 검증된 코스 그대로</h1>
        <p className="text-center text-gray-50 text-15">
          평소 좋아했던 유튜버의 여행을 그대로 따라 갈 수 있는 기회,
          <br /> 마이 플레이스 등록 후 간편하게 코스를 편집해 보세요!
        </p>
      </div>
      <div className="relative">
        <input
          value={searchValue}
          className="text-center border-1 border-gray-40 rounded-s w-630 h-50 py-10 px-30 mb-70 "
          placeholder="원하는여행지, 유튜버, 테마를 검색해보세요"
          onChange={handleSearchInputChange}
          ref={ref}
        />

        {visible && (
          <div className="absolute top-50 z-10">
            <RelatedSearchInfo
              data={relatedData}
              setSectionVisible={setSectionVisible}
              setSearchValue={setSearchValue}
            />
            {/*  리팩토링 할 때 VISIBLE 안으로 넣기 - 리렌더링 방지*/}
          </div>
        )}
        {searchValue ? (
          <div className="absolute cursor-pointer right-20 top-18" onClick={() => setSearchValue('')}>
            <Image src="/assets/icon/clear.png" width={20} height={10} alt="클리어버튼" />
          </div>
        ) : (
          <Image src={search} width={30} height={10} alt="검색이미지" className="absolute right-15 top-15" />
        )}
      </div>
      <CardSection filteredData={filteredData} setSearchValue={setSearchValue} />
      {!inView && (
        <div onClick={handleClickFloat} className="fixed  bottom-0 animate-bounceOnce">
          <InputNavigator />
        </div>
      )}
    </article>
  );
};

export default ListSearchSection;
