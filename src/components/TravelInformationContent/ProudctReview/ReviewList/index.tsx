import { useState } from 'react';

import Image from 'next/image';

import ReviewEditButton from './ReviewEditButton';

import ReviewTextArea from '../CreateReview/ReveiwTextarea';
import ReviewScore from '../CreateReview/ReviewScore';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import convertDate from '@/src/utils/convertDate';

interface ReviewDataProps {
  sortedReview: ReviewDataItem[];
}

interface ReviewDataItem {
  id: number;
  likes: number;
  nickname: string;
  descrpition: string;
  createdAt: string;
  score: number;
}

const ReviewList = ({ sortedReview }: ReviewDataProps) => {
  const [editReview, setEditReview] = useState(false);

  const handleReviewEdit = () => {
    setEditReview(true);
  };

  const handleEdit = () => {
    setEditReview(false);
  };

  return (
    <div className="flex flex-col py-32">
      <ul className=" flex flex-col gap-32 ">
        {sortedReview &&
          sortedReview.map(({ id, nickname, descrpition, createdAt, score }) => (
            <li key={id} className="relative pb-32 border-b-1 border-gray-50">
              <div className="flex items-end gap-8 pb-8">
                <h2 className="text-18 font-bold">{nickname}</h2>
                <div className="text-12 text-gray-50">{convertDate(createdAt)}</div>
              </div>
              <div className="flex gap-5 pb-16">
                {editReview ? (
                  <ReviewScore />
                ) : (
                  [...Array(5)].map((_, index) => (
                    <Image key={index} src={index < score ? star : emptyStar} width={25} height={25} alt="star" />
                  ))
                )}
              </div>
              {editReview ? <ReviewTextArea description={descrpition} onClick={handleEdit} /> : <p>{descrpition}</p>}
              <ReviewEditButton onClickEdit={handleReviewEdit} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ReviewList;
