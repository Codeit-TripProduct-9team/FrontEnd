import { useState } from 'react';

import SortToolbar from './SortToolbar';

import CreateReview from './CreateReview';

import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getReview } from '@/src/api/getReview';
import ReviewList from './ReviewList';
import NoReivewData from './SortToolbar/NoReviewData';

const ProductReview = () => {
  const [sortType, setSortType] = useState('latest');

  const router = useRouter();
  const videoId = router.query.id as string;

  const { data: reviewListData } = useQuery({
    queryKey: ['reviewList', videoId, sortType],
    queryFn: () => getReview({ videoId, sortType }),
  });

  const emptyReveiwData = reviewListData?.status === '4007';

  const reveiwList = reviewListData?.data.content;

  return (
    <div className="flex flex-col w-full pt-65 px-110 bg-white">
      <CreateReview videoId={videoId} />
      <SortToolbar sortType={sortType} setSortType={setSortType} />
      {emptyReveiwData ? <NoReivewData /> : <ReviewList reviewList={reveiwList} />}
    </div>
  );
};

export default ProductReview;
