import ModalContent from '../common/modal/ModalContent';
import Modal from '../common/modal';
import { ERROR_MESSAGE, MODAL_MESSAGE, TOAST_MESSAGE } from '../../constants/constants';
import Button from '../common/button';
import { InputForm } from '@/src/lib/types';
import EmailInput from '../common/input';
import VerifyInput from '../common/input';
import PasswordInput from '../common/input/passwordInput';
import PasswordCheckInput from '../common/input/passwordInput';
import signPageRequestInstance from '@/src/api/signPageRequest';

import { FieldError, useForm } from 'react-hook-form';
import { useOverlay } from '@toss/use-overlay';
import { useState } from 'react';

import { instance } from '@/src/api/axios';
import { REGEX } from '@/src/utils/regex';
// import SendEmail from '../common/Sendemail';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const ResetPwContent = () => {
  const [isVerified, setIsVerified] = useState(false);
  // const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    getValues,
    clearErrors,
    handleSubmit,
    watch,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const route = useRouter();
  const overlay = useOverlay();

  const successChangeModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal
        isOpen={isOpen}
        close={() => {
          close();
          setTimeout(() => {
            route.push('/signin');
          }, 100);
        }}
      >
        <ModalContent modalType={MODAL_MESSAGE.CHANGE_PASSWORD} emoji={'✔️'} />
      </Modal>
    ));
  };

  const emailValue = watch('email') || '';
  const password = watch('password') || '';
  const passwordCheck = watch('passwordcheck') || '';
  // const isEmailvalid = !errors.email && isValidateEmail;
  const isPwValid = password === passwordCheck && password.length > 0 && Object.keys(errors).length === 0;

  const checkVerificationCode = async () => {
    // const verifyValue = getValues('verify');
    // const validCode = verifyValue === verificationCode;
    // if (validCode) toast.success(TOAST_MESSAGE.VERIFY);
    // else toast.error(TOAST_MESSAGE.FAILED_VERIFY);
    try {
      if (Object.keys(errors).length !== 0) {
        const response = await signPageRequestInstance.overlapEmail(emailValue);
        if (response.status === 200) {
          toast.error(TOAST_MESSAGE.FAILED_VERIFY);
          //아래 코드 삭제할 것
          setVerificationCode('11');
        }
      }
    } catch (e) {
      toast.success(TOAST_MESSAGE.VERIFY);
      setIsVerified(true);
    }
  };

  const handleChangePassword = async () => {
    console.log(emailValue, password, passwordCheck);
    try {
      const response = await signPageRequestInstance.changePassword(emailValue, password, passwordCheck);
      if (response.status === 200) successChangeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className=" flex flex-col w-408">
      <h1 className="text-24 font-bold ">비밀번호 찾기</h1>
      <form className=" flex flex-col" onSubmit={handleSubmit(handleChangePassword)}>
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
          {/* <SendEmail
            isVerified={isVerified}
            userEmail={emailValue}
            disabled={!isEmailvalid}
            setVerificationCode={setVerificationCode}
            error={errors.email?.message}
          /> */}
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
              // disabled={!isEmailvalid || isVerified}
              isSuccess={isVerified}
            />
          </div>
          <Button
            type="button"
            className={`min-w-182 h-60 ${errors.verify ? 'mb-25' : 'm-2b-0'}`}
            // disabled={!isEmailvalid}
            onClick={checkVerificationCode}
          >
            인증 요청
          </Button>
        </div>
        <div>
          <PasswordInput
            register={register('password', {
              required: {
                value: true,
                message: ERROR_MESSAGE.EMPTY_PASSWORD,
              },
              pattern: {
                value: REGEX.PASSWORD,
                message: ERROR_MESSAGE.INVALID_PASSWORD_FORMAT,
              },
            })}
            type="password"
            clearError={clearErrors}
            error={errors.password as FieldError}
            inputName="password"
            inputContent="비밀번호"
            labelId="password"
            focusType="password"
            disabled={!isVerified}
            divCheckStyle={!isVerified ? 'bg-gray-20' : 'bg-white'}
          />
          <PasswordCheckInput
            register={register('passwordcheck', {
              required: {
                value: true,
                message: ERROR_MESSAGE.EMPTY_PASSWORD,
              },
              validate: (value) => value === getValues('password') || ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH,
            })}
            type="password"
            clearError={clearErrors}
            error={errors.passwordcheck as FieldError}
            inputName="passwordcheck"
            inputContent="비밀번호 확인"
            labelId="passwordcheck"
            focusType="passwordcheck"
            disabled={!isVerified}
            divCheckStyle={!isVerified ? 'bg-gray-20' : 'bg-white'}
          />
        </div>
        <Button
          type="submit"
          className={`w-full mt-20 ${isPwValid ? 'cursor-pointer' : 'bg-gray-50 cursor-auto'}`}
          disabled={!isPwValid}
          onClick={handleChangePassword}
        >
          변경하기
        </Button>
      </form>
    </section>
  );
};

export default ResetPwContent;
