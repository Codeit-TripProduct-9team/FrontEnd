import { useState } from 'react';

import instance from '@/src/api/axios';

const SelectLike = ({ contentId }: { contentId: number }) => {
  const [isSelectedLike, setIsSelectedLike] = useState(false);

  const handleSelectedLike = async () => {
    //좋아요 로직
    try {
      const body = { favorite: true };
      const response = await instance.put(`travel/${contentId}`, body);
      if (response.status === 200) {
        setIsSelectedLike(true);
      }
      alert('좋아요 모달');
    } catch (error: any) {
      console.error(error);
      alert('다시시도해주세요');
    }
    setIsSelectedLike(true); //삭제
  };

  const handleSelectedUnLike = async () => {
    //싫어요 로직
    try {
      const body = { favorite: false };
      const response = await instance.put(`travel/${contentId}`, body);
      if (response.status === 200) {
        setIsSelectedLike(false);
      }
      alert('좋아요 모달');
    } catch (error: any) {
      console.error(error);
      alert('다시시도해주세요');
    }
    setIsSelectedLike(false); //삭제
  };
  return (
    <div>
      {isSelectedLike ? (
        <button className="text-30" onClick={handleSelectedUnLike}>
          💖
        </button>
      ) : (
        <button className="text-30" onClick={handleSelectedLike}>
          💔
        </button>
      )}
    </div>
  );
};

export default SelectLike;
