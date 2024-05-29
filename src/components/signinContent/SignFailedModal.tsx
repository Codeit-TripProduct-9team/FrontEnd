import React from 'react';
import Modal from '../common/modalTemplate';

interface SignFailedModalProps {
  openModal: boolean;
  handleModalClose: () => void;
}

const SignFailedModal: React.FC<SignFailedModalProps> = ({ openModal, handleModalClose }) => {
  if (!openModal) {
    return null;
  }

  return (
    <Modal className="w-540 mobile:w-327" openModal={openModal} handleModalClose={handleModalClose}>
      왜 안열리냐
    </Modal>
  );
};

export default SignFailedModal;
