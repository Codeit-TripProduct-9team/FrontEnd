import { useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { FieldError, useForm } from 'react-hook-form';

import mainLogo from '@/public/assets/icon/mainLogo.png';

import SendEmail from '../signupContent/sendEmail';
import Button from '../common/button';

import NickNameInput from '../common/input';
import EmailInput from '../common/input';
import VerifyInput from '../common/input';
import PasswordInput from '../common/input/passwordInput';
import PasswordCheckInput from '../common/input/passwordInput';

import { REGEX } from '@/src/utils/regex';
import instance from '@/src/api/axios';

interface InputForm {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck: string;
  nickname: string;
  checkbox?: boolean;
  file?: string;
  verify?: string;
}

const SingupContent = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    clearErrors,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const route = useRouter();

  const emailValue = watch('email');
  const isEmailvalid = !errors.email && isValidateEmail;

  const checkDuplicate = async (emailValue: string) => {
    try {
      const body = { email: emailValue };
      const response = await instance.post('https://bootcamp-api.codeit.kr/api/linkbrary/v1/users/check-email', body);
      if (response.status === 200) {
        setIsValidateEmail(true);
      }

      return response.status !== 409;
    } catch (error) {
      console.error(error);
    }
  };

  const checkVerifyCode = () => {
    const verifyValue = getValues('verify');
    if (verifyValue === verificationCode) {
      setIsVerified(true);
      alert('인증이 성공되었습니다.'); //모달
    }
  };

  const onSubmit = async ({ nickname, email, password, passwordcheck }: InputForm) => {
    try {
      const body = { nickname: nickname, email: email, password: password, passwordcheck: passwordcheck };
      const response = await instance.post('https://bootcamp-api.codeit.kr/api/linkbrary/v1/auth/sign-up', body);
      if (response.status === 200) {
        alert('회원가입확인 모달로 변경');
        route.push('/signin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen gap-24 relative bottom-100">
      <Image className="modile:w-120" src={mainLogo} alt="mainLogo" width={400} />
      <form className="w-400 flex flex-col gap-20" onSubmit={handleSubmit(onSubmit)}>
        <NickNameInput
          register={register('nickname', {
            required: { value: true, message: '닉네임을 입력해주세요' },
          })}
          type="text"
          clearError={clearErrors}
          error={errors.nickname as FieldError}
          inputName="nickname"
          inputContent="닉네임"
          labelId="nickname"
          focusType="nickname"
        />
        <EmailInput
          register={register('email', {
            required: {
              value: true,
              message: '이메일을 입력해주세요',
            },
            pattern: {
              value: REGEX.EMAIL,
              message: '이메일 형식으로 입력해주세요',
            },
            validate: async (emailValue) => {
              const isDuplicate = await checkDuplicate(emailValue);
              return isDuplicate || '중복된 이메일입니다.';
            },
          })}
          type="email"
          clearError={clearErrors}
          error={errors.email as FieldError}
          inputName="email"
          inputContent="이메일"
          labelId="email"
          focusType="email"
        />
        <div className="flex items-center w-full gap-10">
          <div className="w-full">
            <VerifyInput
              register={register('verify', {
                required: {
                  value: true,
                  message: '인증코드를 입력해주세요',
                },
                validate: (value) => value === verificationCode || '인증번호가 일치하지 않습니다.',
              })}
              type="text"
              clearError={clearErrors}
              error={errors.verify as FieldError}
              inputName="verify"
              inputContent="인증코드"
              labelId="verify"
              focusType="verify"
              disabled={!isEmailvalid}
            />
          </div>
          {!isVerified ? (
            <SendEmail
              userEmail={emailValue}
              disabled={!isEmailvalid}
              setVerificationCode={setVerificationCode}
              checkVerifyCode={checkVerifyCode}
            />
          ) : (
            <Button className="w-full" textColor="white" bgColor={'violet'} disabled={true}>
              인증되었습니다
            </Button>
          )}
        </div>
        <PasswordInput
          register={register('password', {
            required: {
              value: true,
              message: '비밀번호를 입력해주세요',
            },
            pattern: {
              value: REGEX.PASSWORD,
              message: '대문자, 특수문자를 최소 하나씩 포함한 8자이상으로 입력해주세요',
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
              message: '비밀번호를 입력해주세요.',
            },
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
          clearError={clearErrors}
          error={errors.passwordcheck as FieldError}
          inputName="passwordcheck"
          inputContent="비밀번호 확인"
          labelId="passwordcheck"
          focusType="passwordcheck"
        />

        <Button type="submit" textColor={'white'} bgColor={'violet'} disabled={Object.keys(errors).length !== 0}>
          회원가입
        </Button>
        <Link href={'/signin'} className="flex justify-center py-10">
          로그인으로 돌아가기
        </Link>
      </form>
    </main>
  );
};

export default SingupContent;
