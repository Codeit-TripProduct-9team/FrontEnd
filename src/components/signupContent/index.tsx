// import { useState, useEffect } from 'react';
import { useEffect } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import toast from 'react-hot-toast';
import { FieldError, useForm } from 'react-hook-form';
import { useOverlay } from '@toss/use-overlay';

import SuccessSignup from './SuccessSingupModal';
// import SendEmail from '../common/Sendemail';
import Button from '../common/button';
import NickNameInput from '../common/input';
import EmailInput from '../common/input';
// import VerifyInput from '../common/input';
import PasswordInput from '../common/input/passwordInput';
import PasswordCheckInput from '../common/input/passwordInput';
import Modal from '../common/modal/index';
import { ERROR_MESSAGE, TOAST_MESSAGE } from '../../constants/constants';

import checkDuplicate from '@/src/utils/checkDuplicate';
import { REGEX } from '@/src/utils/regex';
import instance from '@/src/api/axios';
import { InputForm } from '@/src/lib/types';
// import VerifyButton from './VerifyButton';

const SingupContent = () => {
  // const [isVerified, setIsVerified] = useState(false);
  // const [isValidateEmail, setIsValidateEmail] = useState(false);
  // const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    clearErrors,
    setFocus,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const route = useRouter();

  // const emailValue = watch('email');
  const nicknameValue = watch('nickname');

  const isValid = Object.keys(errors).length !== 0;
  // const isEmailvalid = !errors.email && isValidateEmail;

  const signupOverlay = useOverlay();
  const signupOnModal = () => {
    signupOverlay.open(({ isOpen, close }) => (
      <Modal
        isOpen={isOpen}
        close={() => {
          close();
          setTimeout(() => {
            route.push('/signin');
          }, 500);
        }}
      >
        <SuccessSignup nickname={nicknameValue} />
      </Modal>
    ));
  };

  useEffect(() => {
    setFocus('nickname');
  }, [setFocus]);

  const checkEmailDuplicate = async (emailValue: string) => {
    const isDuplicate = await checkDuplicate('/auth/duplicate/email', {
      email: emailValue,
    });
    if (isDuplicate) {
      // setIsValidateEmail(true);
      toast.success(TOAST_MESSAGE.CHECK_DUPLICATE);
    }
    return isDuplicate;
  };

  // const checkVerificationCode = () => {
  //   const verifyValue = getValues('verify');
  //   const validCode = verifyValue === verificationCode;
  //   if (validCode) {
  //     setIsVerified(true);
  //     toast.success(TOAST_MESSAGE.VERIFY);
  //   }
  // };

  const onSubmit = async ({ nickname, email, password, passwordcheck }: InputForm) => {
    try {
      const body = { nickname: nickname, email: email, password: password, passwordcheck: passwordcheck };
      const response = await instance.post('/auth/register', body);
      if (response.status === 200) {
        signupOnModal();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSubmitOnEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'enter') {
      handleSubmit(onSubmit);
    }
  };

  return (
    <div className=" flex flex-col w-408">
      <h1 className="text-24 font-bold ">회원가입</h1>
      <form className=" flex flex-col" onSubmit={handleSubmit(onSubmit)} onKeyDown={handleSubmitOnEnter}>
        <NickNameInput
          register={register('nickname', {
            required: { value: true, message: ERROR_MESSAGE.EMPTY_NICKNAME },
          })}
          type="text"
          clearError={clearErrors}
          error={errors.nickname as FieldError}
          inputName="nickname"
          inputContent="닉네임"
          labelId="nickname"
          focusType="nickname"
        />
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
                  const isDuplicate = await checkEmailDuplicate(emailValue);
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
              // disabled={isVerified}
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
        {/* <div className="flex items-center w-full gap-10">
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
          <VerifyButton
            isVerified={isVerified}
            error={errors.verify}
            isEmailValid={isEmailvalid}
            checkVerificationCode={checkVerificationCode}
          />
        </div> */}
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
        />
        <Button className="w-full mt-20" disabled={isValid}>
          회원가입
        </Button>
        <Link href={'/signin'} className="flex justify-center py-10 text-14 text-gray-50 ">
          로그인으로 돌아가기
        </Link>
      </form>
    </div>
  );
};

export default SingupContent;
