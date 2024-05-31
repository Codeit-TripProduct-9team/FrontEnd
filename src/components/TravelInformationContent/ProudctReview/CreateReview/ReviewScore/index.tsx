import { useState } from 'react';
import Image from 'next/image';
import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

const ReviewScore = () => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [changeScore, setChangeScore] = useState(-1);

  const handleStarHover = (index: number) => {
    setHoverIndex(index);
  };

  const handleStarLeave = () => {
    setHoverIndex(-1);
  };

  const handleStarClick = (index: number) => {
    setChangeScore(index);
  };

  const selectedScore = (index: number) => (changeScore >= index || hoverIndex >= index ? star : emptyStar);

  return (
    <div className="flex pb-16 gap-5 cursor-pointer">
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          src={selectedScore(index)}
          width={25}
          height={25}
          alt="star"
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

export default ReviewScore;
