import { useState } from 'react';

import ReviewList from './ReviewList';
import SortToolbar from './SortToolbar';
import { reviewData } from './mock';
import CreateReview from './CreateReview';

const ProductReview = () => {
  const [sortedReview, setSortedReview] = useState(reviewData);

  const handleSortByNewest = () => {
    const sorted = [...sortedReview].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSortedReview(sorted);
  };

  const handleSrotByScore = () => {
    const sorted = [...sortedReview].sort((a, b) => b.score - a.score);
    setSortedReview(sorted);
  };

  return (
    <div className="flex flex-col w-full  pt-65 px-110 bg-white">
      <CreateReview />
      <SortToolbar sortByNewest={handleSortByNewest} sortByScore={handleSrotByScore} />
      <ReviewList sortedReview={sortedReview} />
    </div>
  );
};

export default ProductReview;
