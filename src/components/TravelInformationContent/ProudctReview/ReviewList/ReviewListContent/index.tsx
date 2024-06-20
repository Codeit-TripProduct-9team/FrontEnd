import Image from 'next/image';

import { useOverlay } from '@toss/use-overlay';
import DOMPurify from 'dompurify';

import ImageReviewModal from './ImageReviewModal';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import Modal from '@/src/components/common/modal';

const sanitizer = DOMPurify.sanitize;

interface ReviewListContentProps {
  content: string;
  score: number;
  title: string;
}

const ReviewListContent = ({ content, score, title }: ReviewListContentProps) => {
  const imageReviewOverlay = useOverlay();
  const openImageReviewModal = (content: string) => {
    imageReviewOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ImageReviewModal content={content} title={title} />
      </Modal>
    ));
  };
  const hasImage = content.includes('<img');
  return (
    <>
      <div className=" flex gpa-5">
        {[...Array(5)].map((_, index) => (
          <Image key={index} src={index < score ? star : emptyStar} width={25} height={25} alt="star" />
        ))}
      </div>
      <div>
        {hasImage ? (
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => openImageReviewModal(content)}
          >
            이미지 첨부된 리뷰입니다. 보러가기
          </button>
        ) : (
          <p
            id="review-text"
            className="max-h-130 overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: sanitizer(content) }}
          />
        )}
      </div>
    </>
  );
};

export default ReviewListContent;
