import React from 'react';

type ConfirmModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  header: string;
  text: string;
};

const ConfirmModal = ({ onConfirm, onCancel, header, text }: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onCancel();
  };
  return (
    <div className="flex flex-col text-center gap-20">
      <div>
        <div className="text-24 font-bold">{header}</div>
        <div className="text-gray-50">{text}</div>
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
