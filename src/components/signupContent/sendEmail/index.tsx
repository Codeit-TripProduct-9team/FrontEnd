import { useState } from 'react';

import emailjs from 'emailjs-com';

import Button from '../../common/button';

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

  const getVerificationCode = () => {
    // 코드 받아오는 로직
    const randomCode = '123456';
    return randomCode;
  };

  const verficationCode = getVerificationCode();

  const sendVerificationEmail = () => {
    const templateParams = {
      to_email: userEmail,
      from_name: 'test',
      message: verficationCode,
    };

    emailjs
      .send(PULBIC_NEXT_EMAIL_SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_NEXT_EMAIL_PUBLIC_KEY)
      .then((response) => {
        if (response.status === 200) {
          setIsSendEmail(true);
          setVerificationCode(verficationCode);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-182 h-60">
      {isSendEmail ? (
        <Button className="w-full h-60" onClick={sendVerificationEmail} disabled={isVerified}>
          다시 보내기
        </Button>
      ) : (
        <Button
          className="w-full h-60 border border-blue bg-white font-bold"
          textColor="blue"
          onClick={sendVerificationEmail}
          disabled={disabled}
        >
          코드 발송
        </Button>
      )}
    </div>
  );
};

export default SendEmail;
