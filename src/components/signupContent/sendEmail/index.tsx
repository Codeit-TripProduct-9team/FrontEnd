import emailjs from 'emailjs-com';
import { useState } from 'react';

interface SendEmailProps {
  userEmail: string;
}

const SERVICE_ID = 'service_4wlh35v';
const TEMPLATE_ID = 'trip';
const PUBLIC_KEY = 'OAyI8cjbBVuBT_jYk';

const SendEmail = ({ userEmail }: SendEmailProps) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000).toString();
    return randomNumber.padStart(6, '0');
  };

  const verificationCode = generateRandomNumber();

  const sendVerificationEmail = () => {
    const templateParams = {
      to_email: userEmail,
      from_name: 'test',
      message: verificationCode,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        if (response.status === 200) {
          const inputCode = prompt('번호입력'); // 모달

          if (inputCode === verificationCode) {
            setIsEmailSent(true);
          }
          if (inputCode !== verificationCode) {
            setIsEmailSent(false);
          }
        }
      })
      .catch((error) => {});
  };

  const handleVerification = () => {
    sendVerificationEmail();
  };

  return (
    <div>
      {isEmailSent ? (
        <div>인증되었습니다.</div>
      ) : (
        <button className="border border-black" type="button" onClick={handleVerification}>
          '인증하기'
        </button>
      )}
    </div>
  );
};

export default SendEmail;
