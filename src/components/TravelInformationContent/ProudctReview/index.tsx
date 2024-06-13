import SortToolbar from './SortToolbar';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';
import NoReivewData from './SortToolbar/NoReviewData';

import ReviewPagination from './ReivewPagination';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import instance from '@/src/api/axios';

const ProductReview = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortType, setSortType] = useState('latest');
  const [reviewList, setReviewList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const router = useRouter();
  const videoId = router.query.id as string;

  const getReviewList = useCallback(async () => {
    try {
      const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=${pageNumber}`);
      const reveiwData = response.data.data.content;
      const pageCount = response.data.data.page_info.totalPages;
      setReviewList(reveiwData);
      setPageCount(pageCount);
    } catch (error) {
      console.error(error);
    }
  }, [sortType, videoId, pageNumber]);

  useEffect(() => {
    if (videoId) {
      getReviewList();
    }
  }, [getReviewList, videoId]);

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
      <ReviewPagination setPageNumber={setPageNumber} pageNumber={pageNumber} pageCount={pageCount} />
    </div>
  );
};

export default ProductReview;
