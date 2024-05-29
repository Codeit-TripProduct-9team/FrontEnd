import { useState } from 'react';

import emailjs from 'emailjs-com';

import Button from '../../common/button';
import Modal from '../../common/modal';

import randomCode from '@/src/utils/randomCode';

import { ERROR_MESSAGE } from '../constats';
import { useOverlay } from '@toss/use-overlay';
// import EmailConfirmModal from '../../common/modal/emailConfirmModal';
import ModalContent from '../../common/modal/ModalContent';

interface SendEmailProps {
  disabled: boolean;
  userEmail: string;
  isVerified?: boolean;
  setVerificationCode: (code: string) => void;
  error: any;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// const PULBIC_NEXT_EMAIL_SERVICE_ID = 'service_4wlh35v';
// const PUBLIC_NEXT_EMAIL_PUBLIC_KEY = 'OAyI8cjbBVuBT_jYk';

const TEMPLATE_ID = 'trip';

const SendEmail = ({ userEmail, disabled, isVerified, error, setVerificationCode }: SendEmailProps) => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const overlay = useOverlay();
  const onModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ModalContent errorType={ERROR_MESSAGE.EMAIL_NOT_FOUND} emoji={'🥺'}></ModalContent>
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
        }
      })
      .catch((error: any) => {
        if (error.status === 422) {
          onModal();
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
