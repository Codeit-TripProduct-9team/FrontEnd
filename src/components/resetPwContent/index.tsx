import { useOverlay } from '@toss/use-overlay';
import ModalContent from '../common/modal/ModalContent';
import Modal from '../common/modal';
import { MODAL_MESSAGE } from '../signupContent/constats';

const ResetPwContent = () => {
  //모달 사용
  const certifiedOverlay = useOverlay();
  const certifiedOnModal = () => {
    certifiedOverlay.open(({ isOpen, close }) => (
      <Modal className="w-540 mobile:w-327" isOpen={isOpen} close={close}>
        <ModalContent errorType={MODAL_MESSAGE.CERTIFIED_EMAIL} emoji={'💌'} />
      </Modal>
    ));
  };
  return <div>index</div>;
};

export default ResetPwContent;
