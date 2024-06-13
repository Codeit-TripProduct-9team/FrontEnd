import SortToolbar from './SortToolbar';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';
import NoReivewData from './SortToolbar/NoReviewData';

import useGetReviewList from '@/src/hooks/useGetReiveList';
import ReviewPagination from './ReivewPagination';

const ProductReview = () => {
  const { setSortType, reviewList, getReview, videoId, sortType, setPageNumber, pageNumber, maxPage } =
    useGetReviewList();

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
      <ReviewPagination setPageNumber={setPageNumber} pageNumber={pageNumber} maxPage={maxPage} />
    </div>
  );
};

export default ProductReview;
