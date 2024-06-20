interface ReviewEditButtonProsp {
  onClickEdit: () => void;
  onClickDelete: () => void;
  isEdit: boolean;
}

const ReviewEditButton = ({ onClickEdit, onClickDelete, isEdit }: ReviewEditButtonProsp) => {
  return (
    <div className="absolute flex bottom-10 right-20">
      {!isEdit && (
        <button className="p-5 text-gray-80 hover:text-blue" onClick={onClickEdit}>
          수정
        </button>
      )}

      <button className="p-5 text-gray-80 hover:text-red" onClick={onClickDelete}>
        삭제
      </button>
    </div>
  );
};

export default ReviewEditButton;
