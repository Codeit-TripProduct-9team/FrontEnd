import { useState } from 'react';
import Image from 'next/image';

import ReviewEditButton from './ReviewEditButton';
import ReviewTextArea from '../CreateReview/ReveiwTextarea';
import ReviewScore from '../CreateReview/ReviewScore';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import convertDate from '@/src/utils/convertDate';
import { useOverlay } from '@toss/use-overlay';
import Modal from '@/src/components/common/modal';
import DeleteReviewModal from './DeleteReviewModal/indext';
import instance from '@/src/api/axios';
import { getCookie } from '@/src/utils/cookie';

interface ReviewDataProps {
  reviewList: ReviewDataItem[];
  renderReviewList: () => void;
  videoId: string;
}

interface ReviewDataItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  score: number;
}

const ReviewList = ({ reviewList, renderReviewList, videoId }: ReviewDataProps) => {
  const [editReview, setEditReview] = useState<number | null>(null);
  const [editScore, setEditScore] = useState(0);
  const [editContent, setEditContent] = useState('');

  const hasToken = getCookie('accessToken');

  const deleteReviewOverlay = useOverlay();
  const deleteReviewModal = (reviewId: number) => {
    deleteReviewOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <DeleteReviewModal reviewId={reviewId} onClickDeleteReview={handleReviewDelete} onClickCancelDelete={close} />
      </Modal>
    ));
  };

  const deleteReview = async (reviewId: number) => {
    try {
      const headers = {
        Authorization: `Bearer ${hasToken}`,
        'Content-Type': 'application/json',
      };
      await instance.delete(`/video/${videoId}/review/${reviewId}`, { headers });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReview = async (reviewId: number) => {
    const body = {
      title: '수정',
      nickname: '수정',
      content: editContent,
      score: editScore,
    };
    const headers = {
      Authorization: `Bearer ${hasToken}`,
      'Content-Type': 'application/json',
    };
    try {
      await instance.put(`/video/${videoId}/review/${reviewId}`, body, { headers });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewEdit = (id: number, content: string, score: number) => {
    setEditReview(id);
    setEditContent(content);
    setEditScore(score);
  };

  const handleEdit = async (id: number) => {
    try {
      await fetchReview(id);
      setEditReview(null);
      renderReviewList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewDelete = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      renderReviewList();
      deleteReviewOverlay.close();
    } catch (error) {
      console.error(error);
    }
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
                <ReviewTextArea
                  content={editContent}
                  setContent={setEditContent}
                  onClick={() => handleEdit(id)}
                  reviewId={id}
                />
              ) : (
                <p>{content}</p>
              )}
              <ReviewEditButton
                onClickEdit={() => handleReviewEdit(id, content, score)}
                onClickDelete={() => deleteReviewModal(id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewList;
