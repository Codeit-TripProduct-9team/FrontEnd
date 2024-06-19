import DOMPurify from 'dompurify';

interface ImageReviewModalProps {
  content: string;
}

const sanitizer = DOMPurify.sanitize;

const ImageReviewModal = ({ content }: ImageReviewModalProps) => {
  return (
    <div className="flex flex-col gap-20 text-center pb-30">
      <div className=" py-40 px-40">
        <p id="review-text" dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
      </div>
    </div>
  );
};

export default ImageReviewModal;
