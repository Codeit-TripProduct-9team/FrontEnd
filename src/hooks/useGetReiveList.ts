import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import instance from '../api/axios';

const useGetReviewList = () => {
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

  return { setSortType, reviewList, getReview, videoId, sortType };
};

export default useGetReviewList;
