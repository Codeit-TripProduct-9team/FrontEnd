import { useState } from 'react';

import ReviewList from './ReviewList';
import SortToolbar from './SortToolbar';
import { reviewData } from './mock';

const ProductReview = () => {
  const [sortedReview, setSortedReview] = useState(reviewData);

  const handleSortByNewest = () => {
    const sorted = [...sortedReview].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSortedReview(sorted);
  };

  const handleSortByLikes = () => {
    const sorted = [...sortedReview].sort((a, b) => b.likes - a.likes);
    setSortedReview(sorted);
  };

  const handleSrotByScore = () => {
    const sorted = [...sortedReview].sort((a, b) => b.score - a.score);
    setSortedReview(sorted);
  };

  return (
    <div className="flex flex-col gap-40">
      <SortToolbar sortByNewest={handleSortByNewest} sortByLikes={handleSortByLikes} sortByScore={handleSrotByScore} />
      <ReviewList sortedReview={sortedReview} />
    </div>
  );
};

export default ProductReview;
