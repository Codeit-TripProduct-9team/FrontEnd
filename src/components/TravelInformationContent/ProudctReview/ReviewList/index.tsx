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
  title: string;
  content: string;
  createdAt: string;
  score: number;
}

const ReviewList = ({ reviewList }: ReviewDataProps) => {
  const [editReview, setEditReview] = useState<number | null>(null);
  const [editScore, setEditScore] = useState(0);
  const [editContent, setEditContent] = useState('');

  const handleReviewEdit = (id: number) => {
    setEditReview(id);
    setEditContent(editContent);
    setEditScore(editScore);
  };

  const handleEdit = () => {
    setEditReview(null);
  };

  return (
    <div className="flex flex-col py-32">
      <ul className="flex flex-col gap-32">
        {reviewList?.map(({ id, title, content, createdAt, score }) => {
          return (
            <li key={id} className="relative pb-32 border-b-1 border-gray-50">
              <div className="flex items-end gap-8 pb-8">
                <h2 className="text-18 font-bold">{title}</h2>
                <div className="text-12 text-gray-50">{convertDate(createdAt)}</div>
              </div>

              <div className="flex gap-5 pb-16">
                {editReview === id ? (
                  <ReviewScore setScore={setEditScore} score={editScore} />
                ) : (
                  [...Array(5)].map((_, index) => (
                    <Image key={index} src={index < score ? star : emptyStar} width={25} height={25} alt="star" />
                  ))
                )}
              </div>
              {editReview === id ? (
                <ReviewTextArea content={editContent} setContent={setEditContent} onClick={handleEdit} />
              ) : (
                <p>{content}</p>
              )}
              <ReviewEditButton onClickEdit={() => handleReviewEdit(id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewList;
