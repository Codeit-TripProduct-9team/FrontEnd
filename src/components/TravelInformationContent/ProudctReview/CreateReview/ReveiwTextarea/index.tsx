import useTextCounter from '@/src/hooks/useTextCounter';

const ReviewTextArea = () => {
  const maxTextLength = 300;
  const { content, handleCountText, currentCount } = useTextCounter(maxTextLength);

  return (
    <div className="relative w-full h-200 mb-36 rounded-m bg-gray-10 overflow-hidden">
      <textarea
        className="w-full h-200 py-20 px-28 bg-transparent resize-none focus:outline-none"
        placeholder="이곳에서의 경험은 어떠셨나요?"
        value={content}
        onChange={handleCountText}
      />
      <button className="absolute bottom-20 right-100 text-red text-28">작성</button>
      <div className="absolute bottom-20 right-28 text-18 text-gray-50">
        {currentCount}/{maxTextLength}
      </div>
    </div>
  );
};

export default ReviewTextArea;
