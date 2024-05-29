import { useState } from 'react';

import emailjs from 'emailjs-com';

import FailedSendMail from '../Modal/FailedSendMail';
import SuccessSendMail from '../Modal/SuccessSendMail';

import Button from '../../common/button';
import ModalPortal from '../../common/modalTemplate/ModalPortal';

import randomCode from '@/src/utils/randomCode';
import useModal from '@/src/hooks/useModal';

interface SendEmailProps {
  disabled: boolean;
  userEmail: string;
  isVerified?: boolean;
  setVerificationCode: (code: string) => void;
  error: any;
}

const PULBIC_NEXT_EMAIL_SERVICE_ID = 'service_4wlh35v';
const PUBLIC_NEXT_EMAIL_PUBLIC_KEY = 'OAyI8cjbBVuBT_jYk';

const TEMPLATE_ID = 'trip';

const SendEmail = ({ userEmail, disabled, isVerified, error, setVerificationCode }: SendEmailProps) => {
  const [isSendEmail, setIsSendEmail] = useState(false);
  const {
    openModal: failedSendMail,
    handleModalClose: failedSendMailClose,
    handleModalOpen: failedSendMailOpen,
  } = useModal();
  const {
    openModal: successSendMail,
    handleModalClose: successSendMailClose,
    handleModalOpen: successSendMailOpen,
  } = useModal();

  const sendVerificationEmail = () => {
    const verifyCode = randomCode();

    const templateParams = {
      to_email: userEmail,
      from_name: 'test',
      message: verifyCode,
    };

    emailjs
      .send(PULBIC_NEXT_EMAIL_SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_NEXT_EMAIL_PUBLIC_KEY)
      .then((response) => {
        if (response.status === 200) {
          setIsSendEmail(true);
          setVerificationCode(templateParams.message);
          successSendMailOpen();
        }
      })
      .catch((error: any) => {
        if (error.status === 422) {
          failedSendMailOpen();
        }
      });
  };

  return (
    <>
      <ModalPortal>
        <FailedSendMail openModal={failedSendMail} handleModalClose={failedSendMailClose} />
        <SuccessSendMail openModal={successSendMail} handleModalClose={successSendMailClose} />
      </ModalPortal>
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
