import { useRef } from 'react';

import Button from '@/src/components/common/button';
import useAutoFocus from '@/src/hooks/useAtuoFocus';
import TextEditor from './TextEditor';

interface ReviewTextAreaProps {
  content: string;
  title: string;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  createReview?: (reviewId?: number) => void;
  reviewId?: number;
  isEdit?: boolean;
  cancleEditReview: () => void;
}

const ReviewTextArea = ({
  reviewId,
  content,
  title,
  setContent,
  setTitle,
  createReview,
  isEdit,
  cancleEditReview,
}: ReviewTextAreaProps) => {
  const focusRef = useRef<HTMLInputElement>(null);

  useAutoFocus(focusRef);

  const deleteTag = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleTextEditorChange = (content: string) => {
    setContent(content);
  };

  const handleChnageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTitle(title);
  };

  const emptyReview = deleteTag(content).trim() === '' || title.trim() === '';

  return (
    <div className="relative flex flex-col w-full h-300 mb-36 rounded-m bg-gray-10 ">
      <input
        ref={focusRef}
        className=" mt-28 mb-10 mx-28 px-18 h-40 text-20 bg-white border-2 rounded-m focus-visible:border-gray-50"
        placeholder="리뷰의 제목을 입력해주세요!"
        value={title}
        onChange={handleChnageInput}
      />
      <TextEditor content={content} handleChangeTextArea={handleTextEditorChange} />

      <Button
        type="button"
        onClick={() => createReview(reviewId)}
        className="absolute bottom-15 right-35 w-60 h-35 text-18 disabled:bg-gray-60"
        disabled={emptyReview}
      >
        작성
      </Button>
      {isEdit && (
        <Button
          onClick={cancleEditReview}
          className="absolute bottom-15 right-105 w-60 h-35 text-18 disabled:bg-gray-60 bg-red"
        >
          취소
        </Button>
      )}
      <div className="absolute bottom-20 right-28 text-18 text-gray-50"></div>
    </div>
  );
};

export default ReviewTextArea;
