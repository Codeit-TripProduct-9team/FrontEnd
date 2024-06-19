import { useOverlay } from '@toss/use-overlay';
import DOMPurify from 'dompurify';

import ImageReviewModal from '../ImageReviewModal';

import Modal from '@/src/components/common/modal';

const sanitizer = DOMPurify.sanitize;

const ReviewListContent = ({ content }) => {
  const imageReviewOverlay = useOverlay();
  const openImageReviewModal = (content: string) => {
    imageReviewOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ImageReviewModal content={content} />
      </Modal>
    ));
  };
  const hasImage = content.includes('<img');
  return (
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
  );
};

export default ReviewListContent;
