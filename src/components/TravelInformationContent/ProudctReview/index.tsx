import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import SortToolbar from './SortToolbar';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';
import NoReivewData from './SortToolbar/NoReviewData';
import ScrollButton from '../ScrollButton';

import instance from '@/src/api/axios';
import { ReviewDataItem } from '@/src/lib/types';

const ProductReview = () => {
  const [reviewList, setReviewList] = useState<ReviewDataItem[]>([]);
  const [queryNumber, setQueryNumber] = useState(0);
  const [countScrollEvent, setCountScrollEvnet] = useState(0);
  const [sortType, setSortType] = useState('latest');

  const router = useRouter();
  const videoId = router.query.id as string;

  const observerRef = useRef<HTMLDivElement | null>(null);

  const getReviewList = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=${queryNumber}`);
      const defaultReviewList = response.data.data.content;
      const countScrollEvent = response.data.data.page_info.totalPages;
      setReviewList((prevReviewList) => [...prevReviewList, ...defaultReviewList]);
      setCountScrollEvnet(countScrollEvent);
    } catch (error) {
      console.error(error);
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
      if (targetPosition.isIntersecting && queryNumber < countScrollEvent - 1) {
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
  }, [queryNumber, countScrollEvent]);

  const emptyReveiwData = reviewList.length === 0;

  return (
    <div className="flex flex-col w-full pt-65 px-110 bg-white">
      <CreateReview videoId={videoId} renderReveiwList={getReviewList} />
      <SortToolbar sortType={sortType} setSortType={setSortType} />
      {emptyReveiwData ? (
        <NoReivewData />
      ) : (
        <ReviewList reviewList={reviewList} renderReviewList={getReviewList} videoId={videoId} />
      )}
      <div ref={observerRef} className="h-10"></div>
      <ScrollButton targetId={'top'} />
    </div>
  );
};

export default ProductReview;
