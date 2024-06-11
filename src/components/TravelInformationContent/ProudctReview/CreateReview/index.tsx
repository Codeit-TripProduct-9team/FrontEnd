import instance from '@/src/api/axios';
import ReviewTextArea from './ReveiwTextarea';
import ReviewScore from './ReviewScore';
import { useState } from 'react';

interface CreateReviewProps {
  videoId: string;
}

interface AddNewRevieProps {
  title: string;
  nickname: string;
  content: string;
  score: number;
}

const CreateReview = ({ videoId }: CreateReviewProps) => {
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const addNewReview = async ({ title, nickname, content, score }: AddNewRevieProps) => {
    try {
      const headers = {
        Authorization:
          'Bearer eyJhbGciOiJIUzM4NCJ9.eyJlbWFpbCI6InRlc3RAY29kZWl0LmNvbSIsImV4cCI6MTcxNzg1NTMxNX0.O3Z_ZJWUfXOf-raoXPqL0f9eQzchj3qNqJxHYBPmmrCMKpTEbO93lGTmstyNf-BX',
      };

      const body = { title: title, nickname: nickname, content: content, score: score };
      const response = await instance.post(`/video/${videoId}/review`, body, { headers });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateReview = () => {
    const reviewData = {
      title: '',
      nickname: '임시',
      content,
      score,
    };
    addNewReview(reviewData);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-12 border-b-1 border-gray-50">
      <h1 className="text-24 font-bold">리뷰를 작성해 주세요.</h1>
      <ReviewScore score={score} setScore={setScore} />
      <ReviewTextArea
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onClick={handleCreateReview}
      />
    </div>
  );
};

export default CreateReview;
