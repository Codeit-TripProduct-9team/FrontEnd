import { useState } from 'react';
import Image from 'next/image';

import { useOverlay } from '@toss/use-overlay';

import DeleteReviewModal from './DeleteReviewModal/indext';
import ReviewEditButton from './ReviewEditButton';
import ReviewTextArea from '../CreateReview/ReveiwTextarea';
import ReviewScore from '../CreateReview/ReviewScore';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import convertDate from '@/src/utils/convertDate';
import Modal from '@/src/components/common/modal';
import { ReviewDataItem } from '@/src/lib/types';
import { getCookie } from '@/src/utils/cookie';
import instance from '@/src/api/axios';
import dompurify from 'dompurify';

interface ReviewDataProps {
  reviewList: ReviewDataItem[];
  renderReviewList: () => void;
  videoId: string;
}

const sanitizer = dompurify.sanitize;

const ReviewList = ({ reviewList, renderReviewList, videoId }: ReviewDataProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editReviewId, setEditReviewId] = useState<number | null>(null);
  const [editReviewTitle, setEditReviewTitle] = useState('');
  const [editReviewContent, setEditReviewContent] = useState('');
  const [editReveiwScore, setEditReviewScore] = useState(0);

  const hasToken = getCookie('accessToken');

  const deleteReviewOverlay = useOverlay();
  const deleteReviewModal = (reviewId: number) => {
    deleteReviewOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <DeleteReviewModal reviewId={reviewId} onClickDeleteReview={handleReviewDelete} onClickCancelDelete={close} />
      </Modal>
    ));
  };

  const handleReviewEditData = (id: number, content: string, score: number, title: string) => {
    setEditReviewId(id);
    setEditReviewContent(content);
    setEditReviewScore(score);
    setEditReviewTitle(title);
    setIsEdit(true);
  };

  const handleChangeReview = async (reviewId: number) => {
    const body = {
      title: editReviewTitle,
      nickname: '수정',
      content: editReviewContent,
      score: editReveiwScore,
    };
    const headers = {
      Authorization: `Bearer ${hasToken}`,
    };
    try {
      const response = await instance.patch(`/video/${videoId}/review/${reviewId}`, body, { headers });
      console.log(response);
      if (response.status === 200) {
        setEditReviewId(null);
        renderReviewList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewDelete = async (reviewId: number) => {
    try {
      const headers = {
        Authorization: `Bearer ${hasToken}`,
      };
      const response = await instance.delete(`/video/${videoId}/review/${reviewId}`, { headers });
      if (response.status === 200) {
        renderReviewList();
        deleteReviewOverlay.close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancleEditReview = () => {
    setEditReviewId(null);
    setIsEdit(false);
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
                {editReviewId === id ? (
                  <ReviewScore setScore={setEditReviewScore} score={editReveiwScore} />
                ) : (
                  [...Array(5)].map((_, index) => (
                    <Image key={index} src={index < score ? star : emptyStar} width={25} height={25} alt="star" />
                  ))
                )}
              </div>
              {editReviewId === id ? (
                <ReviewTextArea
                  title={editReviewTitle}
                  setTitle={setEditReviewTitle}
                  content={editReviewContent}
                  setContent={setEditReviewContent}
                  createReview={() => handleChangeReview(id)}
                  reviewId={id}
                  isEdit={isEdit}
                  cancleEditReview={handleCancleEditReview}
                />
              ) : (
                <p
                  id="review-text"
                  className="max-h-130 overflow-y-scroll"
                  dangerouslySetInnerHTML={{ __html: sanitizer(content) }}
                />
              )}
              <ReviewEditButton
                onClickEdit={() => handleReviewEditData(id, content, score, title)}
                onClickDelete={() => deleteReviewModal(id)}
                isEdit={isEdit}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewList;
