import { useState } from 'react';

import ReviewList from './ReviewList';
import SortToolbar from './SortToolbar/indes';
import { reviewData } from './mock';

const ProductReview = () => {
  const [sortedReview, setSortedReview] = useState(reviewData);

  const sortByNewest = () => {
    const sorted = [...sortedReview].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSortedReview(sorted);
  };

  const sortByLikes = () => {
    const sorted = [...sortedReview].sort((a, b) => b.likes - a.likes);
    setSortedReview(sorted);
  };

  return (
    <div className="flex flex-col gap-40">
      <SortToolbar sortByNewest={sortByNewest} sortByLikes={sortByLikes} />
      <ReviewList sortedReview={sortedReview} />
    </div>
  );
};

export default ProductReview;
