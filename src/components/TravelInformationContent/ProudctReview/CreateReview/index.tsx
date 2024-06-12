import ReviewTextArea from './ReveiwTextarea';
import ReviewScore from './ReviewScore';
import { useState } from 'react';

import instance from '@/src/api/axios';
import toast from 'react-hot-toast';
import { getCookie } from '@/src/utils/cookie';
import { TOAST_MESSAGE } from '@/src/constants/constants';

interface CreateReviewProps {
  videoId: string;
  renderReveiwList: () => void;
}

const CreateReview = ({ videoId, renderReveiwList }: CreateReviewProps) => {
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const hasToken = getCookie('accessToken');

  const createReview = async () => {
    const body = { title: '테스트', nickname: '테스트', content: content, score: score };
    const headers = {
      Authorization: `Bearer ${hasToken}`,
      'Content-Type': 'application/json',
    };
    const response = await instance.post(`/video/${videoId}/review`, body, { headers });
    return response.data;
  };

  const handleCreateReview = async () => {
    const hasScore = score === 0;
    if (hasScore) {
      toast.error(TOAST_MESSAGE.EMPTY_SCORE);
    }

    if (!hasScore) {
      try {
        const response = await createReview();
        if (response.status == 2000) {
          renderReveiwList();
          setScore(0);
          setContent('');
          toast.success(TOAST_MESSAGE.SUCCESS_REVIEW);
        }
      } catch (error: any) {
        if (error.response.message) {
          toast.error(error.response.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12 border-b-1 border-gray-50">
      <h1 className="text-24 font-bold">리뷰를 작성해 주세요.</h1>
      <ReviewScore score={score} setScore={setScore} />
      <ReviewTextArea content={content} setContent={setContent} onClick={handleCreateReview} />
    </div>
  );
};

export default CreateReview;
