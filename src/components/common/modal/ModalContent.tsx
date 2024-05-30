import React from 'react';

type ModalContentType = {
  emoji: React.ReactNode;
  modalType: string;
  modalText?: string;
};

const ModalContent = ({ emoji, modalType, modalText }: ModalContentType) => {
  return (
    <div className="flex flex-col gap-20 text-center pb-30">
      <span className="text-45">{emoji}</span>
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">{modalType}</h1>
        <p className="text-gray-70">{modalText}</p>
      </div>
    </div>
  );
};

export default ModalContent;
