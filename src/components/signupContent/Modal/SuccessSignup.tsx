import React from 'react';
import Modal from '../../common/modalTemplate';

interface SignupModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  nickname: string;
}

const SuccessSignup: React.FC<SignupModalProps> = ({ openModal, handleModalClose, nickname }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      <div className="flex flex-col gap-20 text-center pb-30">
        <span className="text-45">🎉</span>
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-24">회원가입이 완료되었습니다.</h1>
          <p className="text-gray-70">{`${nickname}의 회원가입을 환영합니다.`}</p>
          <p className="text-gray-70">지금 바로 다양한 컨텐츠들을 둘러보세요!</p>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessSignup;
