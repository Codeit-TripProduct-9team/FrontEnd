import Button from '../common/button';
import CardSection from '../mainContent/CardSection';
import { MockDataItem } from '@/src/lib/types';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import { mock } from '../mainContent/mock';
import { useRouter } from 'next/router';
import { useState } from 'react';

const MypageContent = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredData: MockDataItem[] = useFilteredData({ data: mock.data }, searchValue);

  const router = useRouter();
  const handleNavigateToMyRoute = () => {
    router.push('/my-route');
  };
  const handleMavigateToMyList = () => {
    router.push('/my-list');
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
            <Button onClick={handleNavigateToMyRoute} className="w-150 h-40 font-bold">
              지금 코스짜기
            </Button>
            <Button onClick={handleMavigateToMyList} className="w-150 h-40 font-bold">
              저장된 코스 보기
            </Button>
          </div>
        </div>
      </section>
      <section className="py-20 flex flex-col items-center">
        <CardSection filteredData={filteredData} setSearchValue={setSearchValue} />
      </section>
    </>
  );
};

export default MypageContent;
