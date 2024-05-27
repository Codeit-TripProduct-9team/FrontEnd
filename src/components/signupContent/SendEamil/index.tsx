import { useState } from 'react';

import emailjs from 'emailjs-com';

import Button from '../../common/button';

import randomCode from '@/src/utils/randomCode';

import { ERROR_MESSAGE } from '../constats';

interface SendEmailProps {
  disabled: boolean;
  userEmail: string;
  isVerified?: boolean;
  setVerificationCode: (code: string) => void;
}

const PULBIC_NEXT_EMAIL_SERVICE_ID = 'service_4wlh35v';
const PUBLIC_NEXT_EMAIL_PUBLIC_KEY = 'OAyI8cjbBVuBT_jYk';

const TEMPLATE_ID = 'trip';

const SendEmail = ({ userEmail, disabled, isVerified, setVerificationCode }: SendEmailProps) => {
  const [isSendEmail, setIsSendEmail] = useState(false);

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
        }
      })
      .catch((error: any) => {
        if (error.status === 422) {
          alert(ERROR_MESSAGE.EMAIL_NOT_FOUND); //모달
        }
      });
  };

  return (
    <>
      {isSendEmail ? (
        <Button type="button" className="min-w-182 h-60" onClick={sendVerificationEmail} disabled={isVerified}>
          {isVerified ? '인증 완료' : '다시 보내기'}
        </Button>
      ) : (
        <Button
          type="button"
          className="min-w-182 h-60 bg-white border border-blue"
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
