import DOMPurify from 'dompurify';

interface ImageReviewModalProps {
  content: string;
  title: string;
}

const sanitizer = DOMPurify.sanitize;

const ImageReviewModal = ({ content, title }: ImageReviewModalProps) => {
  return (
    <div className="flex flex-col gap-20 pb-30">
      <div className="flex flex-col  gap-20 pt-30 pb-10 px-10 ">
        <h1 className="font-bold text-24">{title}</h1>
        <div id="review-text" dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
      </div>
    </div>
  );
};

export default ImageReviewModal;
