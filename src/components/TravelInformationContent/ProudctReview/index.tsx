import { useEffect, useState, useCallback } from 'react';

import SortToolbar from './SortToolbar';

import CreateReview from './CreateReview';
import instance from '@/src/api/axios';
import { useRouter } from 'next/router';
import ReviewList from './ReviewList';
import NoReivewData from './SortToolbar/NoReviewData';

const ProductReview = () => {
  const [sortType, setSortType] = useState('latest');
  const [reviewList, setReviewList] = useState([]);

  const router = useRouter();
  const videoId = router.query.id as string;

  const getReview = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=0`);
      const result = response.data.data.content;
      setReviewList(result);
    } catch (error) {
      console.error('error');
    }
  }, [sortType, videoId]);

  useEffect(() => {
    if (videoId) {
      getReview();
    }
  }, [getReview, videoId]);

  const emptyReveiwData = reviewList.length === 0;

  return (
    <div className="flex flex-col w-full pt-65 px-110 bg-white">
      <CreateReview videoId={videoId} renderReveiwList={getReview} />
      <SortToolbar sortType={sortType} setSortType={setSortType} />
      {emptyReveiwData ? (
        <NoReivewData />
      ) : (
        <ReviewList reviewList={reviewList} renderReviewList={getReview} videoId={videoId} />
      )}
    </div>
  );
};

export default ProductReview;
