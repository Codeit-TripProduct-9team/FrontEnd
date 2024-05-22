import emailjs from 'emailjs-com';

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
const TEMPLATE_ID = 'trip';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

type SendEmailProps = {
  userEmail: string;
  // setIsVerifiedEmail: (isVerified: boolean) => void;
};

const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000000).toString();
  return randomNumber.padStart(6, '0');
};
const verificationCode = generateRandomNumber();

const sendVerificationEmail = ({ userEmail }: SendEmailProps) => {
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
          alert('이메일 인증이 완료되었습니다.');
        }
        if (inputCode !== verificationCode) {
          alert('인증 코드가 일치하지 않습니다.');
        }
      }
    })
    .catch((error) => {
      console.error(error);
      alert('인증 이메일 발송에 실패했습니다. ');
    });
};

export default sendVerificationEmail;
