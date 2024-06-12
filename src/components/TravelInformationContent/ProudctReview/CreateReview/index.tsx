import ReviewTextArea from './ReveiwTextarea';
import ReviewScore from './ReviewScore';
import { useState } from 'react';

import instance from '@/src/api/axios';

interface CreateReviewProps {
  videoId: string;
  renderReveiwList: () => void;
}

const CreateReview = ({ videoId, renderReveiwList }: CreateReviewProps) => {
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');

  const ACCESS_TOKEN = 'accessToken';

  const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN);
    }
    return null;
  };

  const createReview = async () => {
    const token = getAccessToken();
    const body = { title: '테스트', nickname: '테스트', content: content, score: score };
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await instance.post(`/video/${videoId}/review`, body, { headers });
    return response.data;
  };

  const handleCreateReview = async () => {
    if (score === 0) {
      alert('별점을 등록해주세요.');
    }
    try {
      await createReview();
      renderReveiwList();
      setScore(0);
      setContent('');
    } catch (error) {
      console.error(error);
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
