import { useState } from 'react';

import Image from 'next/image';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

interface ReviewScoreProps {
  score: number;
  setScore: (score: number) => void;
}

const ReviewScore = ({ score, setScore }: ReviewScoreProps) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleStarHover = (index: number) => {
    setHoverIndex(index);
  };

  const handleStarLeave = () => {
    setHoverIndex(-1);
  };

  const handleStarClick = (index: number) => {
    setScore(index + 1);
  };

  return (
    <div className="flex pb-16 gap-5 cursor-pointer">
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          src={score > index || hoverIndex >= index ? star : emptyStar}
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
