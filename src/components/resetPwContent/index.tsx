import { useOverlay } from '@toss/use-overlay';
import ModalContent from '../common/modal/ModalContent';
import Modal from '../common/modal';
import { ERROR_MESSAGE, MODAL_MESSAGE } from '../signupContent/constats';
import Button from '../common/button';
import { FieldError, useForm } from 'react-hook-form';
import { InputForm } from '@/src/types/InputType';
import EmailInput from '../common/input';
import VerifyInput from '../common/input';
import { useState } from 'react';

import instance from '@/src/api/axios';
import { REGEX } from '@/src/utils/regex';
import SendEmail from '../signupContent/SendEamil';
import { useRouter } from 'next/router';

const ResetPwContent = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    getValues,
    clearErrors,
    watch,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  //모달 사용
  const certifiedOverlay = useOverlay();
  const certifiedOnModal = () => {
    return new Promise<boolean>((resolve) => {
      certifiedOverlay.open(({ isOpen, close }) => (
        <Modal
          isOpen={isOpen}
          close={() => {
            resolve(true);
            close();
          }}
        >
          <ModalContent modalType={MODAL_MESSAGE.CERTIFIED_EMAIL} emoji={'💌'} />
        </Modal>
      ));
    });
  };
  const route = useRouter();
  const emailValue = watch('email');
  const isEmailvalid = !errors.email && isValidateEmail;

  const checkDuplicate = async (emailValue: string) => {
    try {
      //'/auth/check-emil'
      const body = { email: emailValue };
      const response = await instance.post('https://bootcamp-api.codeit.kr/api/linkbrary/v1/users/check-email', body);
      if (response.status === 200) {
        setIsValidateEmail(true);
      }

      return response.status !== 409;
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 409) {
        console.log(ERROR_MESSAGE.DUPLICATE_EMAIL);
      }
    }
  };
  const checkVerificationCode = async () => {
    const verifyValue = getValues('verify');
    const validCode = verifyValue === verificationCode;
    if (validCode) {
      setIsVerified(true);
      const move = await certifiedOnModal(); //모달
      if (move) {
        console.log('move');
        route.push('/reset-password/change-password');
      }
    }
  };

  return (
    <section className=" flex flex-col w-408">
      <h1 className="text-24 font-bold ">비밀번호 찾기</h1>
      <form className=" flex flex-col">
        <div className="flex items-center w-full gap-10">
          <div className="w-full">
            <EmailInput
              register={register('email', {
                required: {
                  value: true,
                  message: ERROR_MESSAGE.EMPTY_EMAIL,
                },
                pattern: {
                  value: REGEX.EMAIL,
                  message: ERROR_MESSAGE.INVALID_EMAIL_FORMAT,
                },
                validate: async (emailValue) => {
                  const isDuplicate = await checkDuplicate(emailValue);
                  return isDuplicate || ERROR_MESSAGE.DUPLICATE_EMAIL;
                },
              })}
              type="email"
              clearError={clearErrors}
              error={errors.email as FieldError}
              inputName="email"
              inputContent="ID (이메일 형식)"
              labelId="email"
              focusType="email"
              disabled={isVerified}
            />
          </div>
          <SendEmail
            isVerified={isVerified}
            userEmail={emailValue}
            disabled={!isEmailvalid}
            setVerificationCode={setVerificationCode}
            error={errors.email?.message}
          />
        </div>
        <div className="flex items-center w-full gap-10">
          <div className="w-full">
            <VerifyInput
              register={register('verify', {
                required: {
                  value: true,
                  message: ERROR_MESSAGE.EMPTY_CODE,
                },
                validate: (value) => value === verificationCode || ERROR_MESSAGE.INVALID_CODE_FORMAT,
              })}
              type="text"
              clearError={clearErrors}
              error={errors.verify as FieldError}
              inputName="verify"
              inputContent="인증코드"
              labelId="verify"
              focusType="verify"
              disabled={!isEmailvalid || isVerified}
              isSuccess={isVerified}
            />
          </div>
          <Button
            type="button"
            className={`min-w-182 h-60 ${errors.verify ? 'mb-25' : 'm-2b-0'}`}
            disabled={!isEmailvalid}
            onClick={checkVerificationCode}
          >
            인증 요청
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ResetPwContent;
