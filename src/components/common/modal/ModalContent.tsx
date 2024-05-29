import React from 'react';

type ModalContentType = {
  emoji: React.ReactNode;
  errorType: string;
  errorText?: string;
};

const ModalContent = ({ emoji, errorType, errorText }: ModalContentType) => {
  return (
    <div className="flex flex-col gap-20 text-center pb-30">
      <span className="text-45">{emoji}</span>
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">{errorType}</h1>
        <p className="text-gray-70">{errorText}</p>
      </div>
    </div>
  );
};

export default ModalContent;
