import { useEffect, useState, useCallback } from 'react';
import ReviewList from './ReviewList';
import SortToolbar from './SortToolbar';
import { reviewData } from './mock';
import CreateReview from './CreateReview';
import instance from '@/src/api/axios';
import { useRouter } from 'next/router';

const ProductReview = () => {
  const [reviewList, setReviewList] = useState(reviewData);
  const [sortType, setSortType] = useState('latest');

  const router = useRouter();
  const videoId = router.query.id as string;

  const getReviewList = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=0`);
      setReviewList(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [sortType, videoId]);

  useEffect(() => {
    getReviewList();
  }, [getReviewList, sortType]);

  return (
    <div className="flex flex-col w-full pt-65 px-110 bg-white">
      <CreateReview videoId={videoId} />
      <SortToolbar sortType={sortType} setSortType={setSortType} />
      <ReviewList reviewList={reviewList} />
    </div>
  );
};

export default ProductReview;
