import Button from '@/src/components/common/button';

interface DeleteReviewModalProps {
  reviewId: number;
  onClickDeleteReview: (reviewId: number) => void;
  onClickCancelDelete: () => void;
}

const DeleteReviewModal = ({ reviewId, onClickDeleteReview, onClickCancelDelete }: DeleteReviewModalProps) => {
  return (
    <div className="flex flex-col items-center gap-20 text-center pb-30">
      <span className="text-45">😥</span>
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">리뷰를 삭제하시나요?</h1>
        <div className="flex justify-center items-center gap-20 w-400 mt-20">
          <Button onClick={() => onClickDeleteReview(reviewId)}>삭제하기</Button>
          <Button className="bg-red" onClick={onClickCancelDelete}>
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
