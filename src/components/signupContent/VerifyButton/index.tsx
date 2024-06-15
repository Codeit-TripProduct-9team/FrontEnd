import { FieldError } from 'react-hook-form';
import Button from '../../common/button';

interface VerifyButtonProps {
  isVerified: boolean;
  error: FieldError;
  isEmailValid: boolean;
  checkVerificationCode: () => void;
}

const VerifyButton = ({ isVerified, error, isEmailValid, checkVerificationCode }: VerifyButtonProps) => {
  return (
    <>
      {isVerified ? (
        <Button type="button" className={`min-w-182 h-60 ${error ? 'mb-25' : 'm-2b-0'}`} disabled={true}>
          인증되었습니다
        </Button>
      ) : (
        <Button
          type="button"
          className={`min-w-182 h-60 ${error ? 'mb-25' : 'm-2b-0'}`}
          disabled={!isEmailValid}
          onClick={checkVerificationCode}
        >
          인증 요청
        </Button>
      )}
    </>
  );
};

export default VerifyButton;
