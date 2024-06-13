import { useRef } from 'react';

import Button from '@/src/components/common/button';
import useAutoFocus from '@/src/hooks/useAtuoFocus';

interface ReviewTextAreaProps {
  content: string;
  title: string;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  createReview?: (reviewId?: number) => void;
  reviewId?: number;
}

const ReviewTextArea = ({ reviewId, content, title, setContent, setTitle, createReview }: ReviewTextAreaProps) => {
  const focusRef = useRef<HTMLInputElement>(null);

  useAutoFocus(focusRef);

  const maxTextLength = 300;

  const handleCountText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= maxTextLength) {
      setContent(text);
    }
  };

  const handleChnageTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    setContent(content);
    handleCountText(event);
  };

  const handleChnageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTitle(title);
  };

  const currentCount = content.length;
  const emptyReview = content.trim() === '' || title.trim() === '';

  return (
    <div className="relative flex flex-col w-full h-300 mb-36 rounded-m bg-gray-10 overflow-hidden">
      <input
        ref={focusRef}
        className=" mt-28 mb-10 mx-28 px-18 h-40 text-20 bg-white border-2 rounded-m focus-visible:border-gray-50"
        placeholder="리뷰의 제목을 입력해주세요!"
        value={title}
        onChange={handleChnageInput}
      />
      <textarea
        className="w-full h-180 py-28 px-28 bg-transparent resize-none focus:outline-none"
        placeholder="이곳에서의 경험은 어떠셨나요?"
        value={content}
        onChange={handleChnageTextArea}
      />
      <Button
        onClick={() => createReview(reviewId)}
        className="absolute bottom-15 right-105 w-60 h-35 text-18 disabled:bg-gray-60"
        disabled={emptyReview}
      >
        작성
      </Button>
      <div className="absolute bottom-20 right-28 text-18 text-gray-50">
        {currentCount}/{maxTextLength}
      </div>
    </div>
  );
};

export default ReviewTextArea;
