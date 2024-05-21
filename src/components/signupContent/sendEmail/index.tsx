import emailjs from 'emailjs-com';
import { useState } from 'react';

interface SendEmailProps {
  userEmail: string;
  setIsVerifiedEmail: (isVerified: boolean) => void;
}

const SERVICE_ID = 'service_4wlh35v';
const TEMPLATE_ID = 'trip';
const PUBLIC_KEY = 'OAyI8cjbBVuBT_jYk';

const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000000).toString();
  return randomNumber.padStart(6, '0');
};

const verificationCode = generateRandomNumber();

const SendEmail = ({ userEmail, setIsVerifiedEmail }: SendEmailProps) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resendEmail, setResendEmail] = useState(false);

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

          setResendEmail(true);

          if (inputCode === verificationCode) {
            setIsEmailSent(true);
            setIsVerifiedEmail(true);
            alert('이메일 인증이 완료되었습니다.');
          }
          if (inputCode !== verificationCode) {
            alert('인증 코드가 일치하지 않습니다.');
            setIsEmailSent(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        alert('인증 이메일 발송에 실패했습니다. ');
      });
  };

  return (
    <div>
      {isEmailSent ? (
        <div>인증되었습니다.</div>
      ) : (
        <button className="border border-black" type="button" onClick={sendVerificationEmail}>
          {resendEmail ? '재인증하기' : '인증하기'}
        </button>
      )}
    </div>
  );
};

export default SendEmail;
