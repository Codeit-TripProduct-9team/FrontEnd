import React from 'react';

// type ModalContentType = {
//   emoji: React.ReactNode;
//   modalType: string;
//   modalText?: string;
// };

const ConfirmModal = ({ onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };
  return (
    <div className="flex flex-col text-center gap-20">
      <div>
        <div className="text-24 font-bold">일차를 삭제할까요?</div>
        <div className="text-gray-50">일차에 모든 일정이 삭제됩니다.</div>
      </div>
      <div className="flex justify-center gap-20">
        <button className="w-100 h-42 bg-gray-10 text-gray-50 font-bold rounded-s" onClick={handleConfirm}>
          확인
        </button>
        <button className="w-100 h-42 bg-blue text-white font-bold rounded-s" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
