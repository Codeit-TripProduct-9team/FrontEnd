import { useState } from 'react';

import Image from 'next/image';

import ReviewEditButton from './ReviewEditButton';

import ReviewTextArea from '../CreateReview/ReveiwTextarea';
import ReviewScore from '../CreateReview/ReviewScore';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import convertDate from '@/src/utils/convertDate';

interface ReviewDataProps {
  reviewList: ReviewDataItem[];
}

interface ReviewDataItem {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  score: number;
}

const ReviewList = ({ reviewList }: ReviewDataProps) => {
  const [editReview, setEditReview] = useState<number | null>(null);

  const handleReviewEdit = (id: number) => {
    setEditReview(id);
  };

  const handleEdit = () => {
    setEditReview(null);
  };

  return (
    <div className="flex flex-col py-32">
      <ul className="flex flex-col gap-32">
        {reviewList.map(({ id, nickname, content, createdAt, score }) => {
          return (
            <li key={id} className="relative pb-32 border-b-1 border-gray-50">
              <div className="flex items-end gap-8 pb-8">
                <h2 className="text-18 font-bold">{nickname}</h2>
                <div className="text-12 text-gray-50">{convertDate(createdAt)}</div>
              </div>
              <div>{score}</div>
              {/* <div className="flex gap-5 pb-16">
                {editReview === id ? (
                  <ReviewScore />
                ) : (
                  [...Array(5)].map((_, index) => (
                    <Image key={index} src={index < score ? star : emptyStar} width={25} height={25} alt="star" />
                  ))
                )}
              </div> */}
              {editReview === id ? <ReviewTextArea content={content} onClick={handleEdit} /> : <p>{content}</p>}
              <ReviewEditButton onClickEdit={() => handleReviewEdit(id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewList;
