import CardSection from '../mainContent/CardSection';
import { MockDataItem } from '@/src/lib/types';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import { mock } from '../mainContent/mock';
import { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import Button from '../common/button';

const MypageContent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredData: MockDataItem[] = useFilteredData({ data: mock.data }, searchValue);

  const handleInputChange = (event: ChangeEvent) => {
    setSearchValue((event.target as HTMLInputElement).value); // 입력값을 상태에 설정
  };
  return (
    <>
      <section className="py-20 flex items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center text-center bg-white py-40 w-full mx-110 rounded-l">
          <h2 className="text-36 font-bold">My Page</h2>
          <p className="text-gray-50">
            저장된 코스중 마음에 드는 코스를 골라
            <br />
            당신의 여행에 반영해 보세요
          </p>
          <div className="flex flex-row gap-20">
            <Button className="w-150 h-40 font-bold">
              <Link href="/my-route">지금 코스짜기</Link>
            </Button>
            <Button className="w-150 h-40 font-bold">
              <Link href="/my-course">저장된 코스 보기</Link>
            </Button>
          </div>
        </div>
      </section>
      <hr className="mx-110" />
      <section className="py-20 flex flex-col relative">
        <p>저장된 리뷰 목록</p>
        <input className="absolute right-110" value={searchValue} onChange={handleInputChange} placeholder="검색하기" />
        <div className="flex flex-col items-center">
          <CardSection filteredData={filteredData} setSearchValue={setSearchValue} />
        </div>
      </section>
    </>
  );
};

export default MypageContent;
