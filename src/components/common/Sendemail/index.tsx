import { useState } from 'react';

import emailjs from 'emailjs-com';

import Button from '../button';
import Modal from '../modal';

import randomCode from '@/src/utils/randomCode';

import { MODAL_MESSAGE } from '../../../constants/constants';
import { useOverlay } from '@toss/use-overlay';
import ModalContent from '../modal/ModalContent';

interface SendEmailProps {
  disabled: boolean;
  userEmail: string;
  isVerified?: boolean;
  setVerificationCode: (code: string) => void;
  error: any;
}

const SERVICE_ID = 'service_4wlh35v';
const PUBLIC_KEY = 'OAyI8cjbBVuBT_jYk';

const TEMPLATE_ID = 'trip';
const modalText = {
  fail: '올바른 이메일을 입력해 주세요.',
  success: '메일을 확인해 주세요.',
};

const SendEmail = ({ userEmail, disabled, isVerified, error, setVerificationCode }: SendEmailProps) => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const failOverlay = useOverlay();
  const failModal = () => {
    failOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ModalContent modalType={MODAL_MESSAGE.EMAIL_NOT_FOUND} emoji={'🥺'} modalText={modalText.fail}></ModalContent>
      </Modal>
    ));
  };
  const successOverlay = useOverlay();
  const successModal = () => {
    successOverlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ModalContent modalType={MODAL_MESSAGE.SEND_CODE} emoji={'🎉'} modalText={modalText.success}></ModalContent>
      </Modal>
    ));
  };

  const sendVerificationEmail = () => {
    const verifyCode = randomCode();

    const templateParams = {
      to_email: userEmail,
      from_name: 'test',
      message: verifyCode,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        if (response.status === 200) {
          setIsSendEmail(true);
          setVerificationCode(templateParams.message);
          successModal();
        }
      })
      .catch((error: any) => {
        if (error.status === 422) {
          failModal();
        }
      });
  };

  return (
    <>
      {isSendEmail ? (
        <Button
          type="button"
          className={`min-w-182 h-60 bg-white border border-blue ${error ? 'mb-25' : 'm-2b-0'}`}
          textColor="blue"
          onClick={sendVerificationEmail}
          disabled={isVerified}
        >
          {isVerified ? '인증 완료' : '다시 보내기'}
        </Button>
      ) : (
        <Button
          type="button"
          className={`min-w-182 h-60 bg-white border border-blue ${error ? 'mb-25' : 'm-2b-0'}`}
          textColor="blue"
          onClick={sendVerificationEmail}
          disabled={disabled}
        >
          코드 발송
        </Button>
      )}
    </>
  );
};

export default SendEmail;
