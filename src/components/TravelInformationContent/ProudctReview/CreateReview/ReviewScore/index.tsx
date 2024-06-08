import Image from 'next/image';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import useReviewRating from '@/src/hooks/useRating';

const ReviewScore = () => {
  const { hoverIndex, changeScore, handleStarHover, handleStarLeave, handleStarClick } = useReviewRating();

  return (
    <div className="flex pb-16 gap-5 cursor-pointer">
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          src={changeScore >= index || hoverIndex >= index ? star : emptyStar}
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
