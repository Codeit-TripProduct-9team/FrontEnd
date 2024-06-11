import Button from '@/src/components/common/button';
import useTextCounter from '@/src/hooks/useTextCounter';

interface ReviewTextAreaProps {
  content: string;
  setContent: (content: string) => void;
  onClick?: () => void;
}

const ReviewTextArea = ({ content, setContent, onClick }: ReviewTextAreaProps) => {
  const maxTextLength = 300;
  const { currentCount, handleCountText } = useTextCounter(maxTextLength, content);

  return (
    <div className="relative w-full h-200 mb-36 rounded-m bg-gray-10 overflow-hidden">
      <textarea
        className="w-full h-200 py-5 px-28 bg-transparent resize-none focus:outline-none"
        placeholder="이곳에서의 경험은 어떠셨나요?"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          handleCountText(e);
        }}
      />
      <Button
        onClick={onClick}
        className="absolute bottom-15 right-105 w-60 h-35 text-18 disabled:bg-gray-60"
        disabled={content.trim() === ''}
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
