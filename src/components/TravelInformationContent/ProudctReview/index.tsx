import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import SortToolbar from './SortToolbar';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';
import NoReivewData from './SortToolbar/NoReviewData';
import ScrollButton from './ScrollButton';

import instance from '@/src/api/axios';
import { ReviewDataItem } from '@/src/lib/types';

const ProductReview = () => {
  const [queryNumber, setQueryNumber] = useState(0);
  const [sortType, setSortType] = useState('latest');
  const [scrollControlEvent, setScrollControlEvent] = useState(0);
  const [reviewList, setReviewList] = useState<ReviewDataItem[]>([]);
  const [reviewListError, setReviewListError] = useState(false);
  const [reviewListLoading, setReviewListLoading] = useState(true);

  const router = useRouter();
  const videoId = router.query.id as string;

  const observerRef = useRef<HTMLDivElement | null>(null);

  const getReviewList = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=${queryNumber}`);
      const currentFetchingReviewList = response.data.data.content;
      const scrollControlEvent = response.data.data.pageInfo.totalPages;
      if (response.status === 200) {
        const firstPage = queryNumber === 0;
        setTimeout(() => {
          setReviewList((prevReviewList) =>
            firstPage ? currentFetchingReviewList : [...prevReviewList, ...currentFetchingReviewList],
          );
          setScrollControlEvent(scrollControlEvent);
          setReviewListError(false);
        }, 500);
      }
    } catch (error) {
      setReviewListError(true);
    } finally {
      setReviewListLoading(true);
    }
  }, [sortType, videoId, queryNumber]);

  useEffect(() => {
    if (videoId) {
      getReviewList();
    }
  }, [getReviewList, videoId]);

  useEffect(() => {
    if (!observerRef.current) return;

    const handleInfinityScroll = (entries: IntersectionObserverEntry[]) => {
      const targetPosition = entries[0];
      if (targetPosition.isIntersecting && queryNumber < scrollControlEvent - 1) {
        setQueryNumber((prevqueryNumber) => prevqueryNumber + 1);
      }
    };

    const observer = new IntersectionObserver(handleInfinityScroll, {
      rootMargin: '20px',
      threshold: 1.0,
    });

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [queryNumber, scrollControlEvent]);

  useEffect(() => {
    setReviewList([]);
    setQueryNumber(0);
  }, [sortType]);

  const emptyReveiwData = reviewList.length === 0;
  const ReveiwDataStauts = reviewListError
    ? '리뷰 데이터를 받아오지 못했습니다'
    : reviewListLoading
    ? '리뷰를 받아오는 중입니다.'
    : '리뷰가 없습니다. 리뷰를 등록해 주세요';

  return (
    <div className="flex flex-col w-full pt-65 px-110 bg-white">
      <CreateReview videoId={videoId} renderReveiwList={getReviewList} />
      <SortToolbar sortType={sortType} setSortType={setSortType} />
      {emptyReveiwData ? (
        <NoReivewData message={ReveiwDataStauts} />
      ) : (
        <ReviewList reviewList={reviewList} renderReviewList={getReviewList} videoId={videoId} />
      )}
      <div ref={observerRef} className="h-10" />
      <ScrollButton targetId={'top'} />
    </div>
  );
};

export default ProductReview;
