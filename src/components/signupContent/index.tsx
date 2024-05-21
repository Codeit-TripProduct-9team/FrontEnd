import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import SendEmail from '../signupContent/sendEmail';
import EmailInput from '../common/input';
import NickNameInput from '../common/input';
import PasswordInput from '../common/input/passwordInput';
import PasswordCheckInput from '../common/input/passwordInput';

interface InputForm {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck: string;
  nickname: string;
  checkbox?: boolean;
  file?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;"'<>?,./~`-])[A-Za-z\d!@#$%^&*()_+{}[\]:;"'<>?,./~`-]{8,}$/;

const SingupContent = () => {
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  const {
    register,
    formState: { errors, isValid },
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
      const response = await fetch('https://bootcamp-api.codeit.kr/api/linkbrary/v1/users/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue }),
      });
      if (response.status === 200) {
        setIsValidateEmail(true);
      }

      return response.status !== 409;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (signupData: InputForm) => {
    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/linkbrary/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        alert('회원가입확인 모달로 변경');
        route.push('/signin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit(onSubmit)}>
      <EmailInput
        register={register('email', {
          required: {
            value: true,
            message: '이메일을 입력해주세요',
          },
          pattern: {
            value: EMAIL_REGEX,
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

      {isEmailvalid && <SendEmail userEmail={emailValue} setIsVerifiedEmail={setIsVerifiedEmail} />}

      <PasswordInput
        register={register('password', {
          required: {
            value: true,
            message: '비밀번호를 입력해주세요',
          },
          pattern: {
            value: PASSWORD_REGEX,
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

      <button type="submit" disabled={!isValid || !isVerifiedEmail}>
        회원가입
      </button>
    </form>
  );
};

export default SingupContent;
