import Button from '@/src/components/common/button';
import useTextCounter from '@/src/hooks/useTextCounter';

interface textAreaProps {
  description: string;
  onClick: () => void;
}

const ReviewTextArea = ({ description, onClick }: textAreaProps) => {
  const maxTextLength = 300;
  const { content, handleCountText, currentCount } = useTextCounter(maxTextLength, description);

  return (
    <div className="relative w-full h-200 mb-36 rounded-m bg-gray-10 overflow-hidden">
      <textarea
        className="w-full h-200 py-20 px-28 bg-transparent resize-none focus:outline-none"
        placeholder="이곳에서의 경험은 어떠셨나요?"
        value={content}
        onChange={handleCountText}
      />
      <Button onClick={onClick} className="absolute bottom-15 right-105 w-60 h-35 text-red text-18">
        작성
      </Button>
      <div className="absolute bottom-20 right-28 text-18 text-gray-50">
        {currentCount}/{maxTextLength}
      </div>
    </div>
  );
};

export default ReviewTextArea;
