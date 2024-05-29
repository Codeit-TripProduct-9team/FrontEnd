import React from 'react';
import Modal from '../common/modalTemplate';

interface SignFailedModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  errorText: string;
}

const SignFailedModal: React.FC<SignFailedModalProps> = ({ openModal, handleModalClose, errorText }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="flex flex-col gap-20 text-center pb-30">
        <span className="text-45">🥺</span>
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-24">로그인에 실패했습니다.</h1>
          <p className="text-gray-70">{errorText}</p>
        </div>
      </div>
    </Modal>
  );
};

export default SignFailedModal;
