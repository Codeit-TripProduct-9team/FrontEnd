import { useState } from 'react';

const SelectLike = () => {
  const [isSelectedLike, setIsSelectedLike] = useState(false);
  const handleSelectedLike = () => {
    //좋아요 로직
    setIsSelectedLike(false);
  };

  const handleSelectedUnLike = () => {
    //싫어요 로직
    setIsSelectedLike(true);
  };
  return (
    <div>
      {isSelectedLike ? (
        <button className="text-30" onClick={handleSelectedLike}>
          💔
        </button>
      ) : (
        <button className="text-30" onClick={handleSelectedUnLike}>
          💖
        </button>
      )}
    </div>
  );
};

export default SelectLike;
