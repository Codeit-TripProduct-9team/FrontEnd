import CardSection from '../mainContent/CardSection';
import { CardDataItem } from '@/src/lib/types';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import Button from '../common/button';
import SearchMyCard from './SearchMyCard';
import myCoursePageRequestInstance from '@/src/api/myPageRequest';
import { getCookie } from '@/src/utils/cookie';
import { useRerenderStore } from '@/src/utils/zustand/useRerenderStore';

const MypageContent = () => {
  const [cardData, setCardData] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredData: CardDataItem[] = useFilteredData({ data: cardData }, searchValue);
  const userId = getCookie('userId');
  const { reRender, setRerender } = useRerenderStore();
  useEffect(() => {
    const fetchAndLogCardList = async () => {
      try {
        const cardList = await myCoursePageRequestInstance.getCourseData(userId);
        setCardData(cardList);
        setRerender(!reRender);
      } catch (error) {
        console.error('Error fetching card list:', error);
      }
    };
    fetchAndLogCardList();
  }, [userId, reRender]);
  return (
    <>
      <section className="flex items-center justify-center my-30 ">
        <div className="flex flex-col gap-10 items-center justify-center text-center bg-white py-40 w-full max-w-screen-xl mx-110 rounded-l">
          <h2 className="text-36 font-bold">My Page</h2>
          <p className="text-gray-50">
            저장된 코스중 마음에 드는 코스를 골라
            <br />
            당신의 여행에 반영해 보세요
          </p>
          <div className="flex flex-row gap-20">
            <Button className="w-150 h-40 font-bold hover:bg-blue-500">
              {/* 코스 생성 버튼 */}
              <Link href="/course/new">지금 코스짜기</Link>
            </Button>
            <Button className="w-150 h-40 font-bold hover:bg-blue-500">
              <Link href="/my-course">저장된 코스 보기</Link>
            </Button>
          </div>
        </div>
      </section>
      <hr className="mx-110" />
      <section className="flex flex-col relative items-center gap-10 mb-80">
        <p className="mt-10 mr-1160 text-gray-60 ">저장된 리뷰 목록</p>
        <div className="flex flex-col items-center relative w-1280">
          <CardSection filteredData={filteredData} setSearchValue={setSearchValue} />
          <div className="absolute right-5 -top-10 w-500">
            <SearchMyCard searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MypageContent;
