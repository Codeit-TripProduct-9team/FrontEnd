import React from 'react';
import Modal from '../../common/modalTemplate';

interface SignupModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const FailedSendMail: React.FC<SignupModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="flex flex-col gap-20 text-center pb-30">
        <span className="text-45">🥺</span>
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-24">메일 발송에 실패하였습니다.</h1>
          <p className="text-gray-70">올바른 이메일을 입력해 주세요.</p>
        </div>
      </div>
    </Modal>
  );
};

export default FailedSendMail;
