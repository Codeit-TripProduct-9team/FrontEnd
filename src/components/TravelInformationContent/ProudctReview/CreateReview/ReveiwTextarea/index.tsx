import { useRef } from 'react';

import Button from '@/src/components/common/button';
import useAutoFocus from '@/src/hooks/useAtuoFocus';

interface ReviewTextAreaProps {
  content: string;
  setContent: (content: string) => void;
  onClick?: (reviewId?: number) => void;
  reviewId?: number;
}

const ReviewTextArea = ({ reviewId, content, setContent, onClick }: ReviewTextAreaProps) => {
  const focusRef = useRef<HTMLTextAreaElement>(null);

  useAutoFocus(focusRef);

  const maxTextLength = 300;

  const handleCountText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text.length <= maxTextLength) {
      setContent(text);
    }
  };

  const currentCount = content.length;
  const emptyContent = content.trim() === '';

  return (
    <div className="relative w-full h-200 mb-36 rounded-m bg-gray-10 overflow-hidden">
      <textarea
        ref={focusRef}
        className="w-full h-200 py-30 px-28 bg-transparent resize-none focus:outline-none"
        placeholder="이곳에서의 경험은 어떠셨나요?"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
          handleCountText(event);
        }}
      />
      <Button
        onClick={() => {
          if (onClick) {
            onClick(reviewId);
          }
        }}
        className="absolute bottom-15 right-105 w-60 h-35 text-18 disabled:bg-gray-60"
        disabled={emptyContent}
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
