import React from 'react';

interface SignFailedModalProps {
  errorText: string;
}

const SignFailedModal: React.FC<SignFailedModalProps> = ({ errorText }) => {
  return (
    <div className="flex flex-col gap-20 text-center pb-30">
      <span className="text-45">🥺</span>
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">로그인에 실패했습니다.</h1>
        <p className="text-gray-70">{errorText}</p>
      </div>
    </div>
  );
};

export default SignFailedModal;
