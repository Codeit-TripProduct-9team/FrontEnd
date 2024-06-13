import { useState } from 'react';

const useReviewRating = (initialScore = -1) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [changeScore, setChangeScore] = useState(initialScore);

  const handleStarHover = (index: number) => {
    setHoverIndex(index);
  };

  const handleStarLeave = () => {
    setHoverIndex(-1);
  };

  const handleStarClick = (index: number) => {
    setChangeScore(index);
  };

  return {
    hoverIndex,
    changeScore,
    handleStarHover,
    handleStarLeave,
    handleStarClick,
  };
};

export default useReviewRating;
