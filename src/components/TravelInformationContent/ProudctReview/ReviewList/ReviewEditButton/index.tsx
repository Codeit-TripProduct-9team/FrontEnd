interface ReviewEditButtonProsp {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const ReviewEditButton = ({ onClickEdit, onClickDelete }: ReviewEditButtonProsp) => {
  return (
    <div className="absolute flex bottom-10 right-20">
      <button className="p-5 text-gray-80 hover:text-blue" onClick={onClickEdit}>
        수정
      </button>

      <button className="p-5 text-gray-80 hover:text-red" onClick={onClickDelete}>
        삭제
      </button>
    </div>
  );
};

export default ReviewEditButton;
