import ReviewTextArea from './ReveiwTextarea';
import ReviewScore from './ReviewScore';
import { useState } from 'react';
import { useMutation } from 'react-query';
import PostReview, { PostReviewProps } from '@/src/api/postReview';
import { queryClient } from '@/src/pages/_app';

interface CreateReviewProps {
  videoId: string;
}

const CreateReview = ({ videoId }: CreateReviewProps) => {
  const [score, setScore] = useState(0);
  const [content, setContent] = useState('');

  const createReviewList = useMutation({
    mutationFn: (reviewData: PostReviewProps) => PostReview(reviewData),
    onSuccess: () => {
      alert('생성되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['reviewList'] });
    },
  });

  const handleCreateReview = () => {
    if (score === 0) {
      alert('별점을 등록해주세요.');
    }

    if (score !== 0) {
      const reviewData = {
        videoId: videoId,
        title: '테스트',
        nickname: '임시',
        content,
        score,
      };
      createReviewList.mutate(reviewData);
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
