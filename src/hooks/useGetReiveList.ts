import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import instance from '../api/axios';

const useGetReviewList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortType, setSortType] = useState('latest');
  const [reviewList, setReviewList] = useState([]);
  const [maxPage, setMaxPage] = useState(0);

  const router = useRouter();
  const videoId = router.query.id as string;

  const getReview = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=${pageNumber}`);
      const result = response.data.data.content;
      const pageCount = response.data.data.page_info.totalPages;
      setReviewList(result);
      setMaxPage(pageCount);
    } catch (error) {
      console.error('error');
    }
  }, [sortType, videoId, pageNumber]);

  useEffect(() => {
    if (videoId) {
      getReview();
    }
  }, [getReview, videoId]);

  return { setSortType, reviewList, getReview, videoId, sortType, setPageNumber, pageNumber, maxPage };
};

export default useGetReviewList;
