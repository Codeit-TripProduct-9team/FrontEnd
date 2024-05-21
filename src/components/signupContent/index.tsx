import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SendEmail from '../signupContent/sendEmail';

interface userSignUpData {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  verify: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>?,./~`-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>?,./~`-]{8,}$/;

const SingupContent = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordCheck, setIsShowPasswordCheck] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    watch,
  } = useForm<userSignUpData>({ mode: 'onBlur' });

  const route = useRouter();

  const emailValue = watch('email');

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleShowPasswordCheck = () => {
    setIsShowPasswordCheck(!isShowPasswordCheck);
  };

  const checkDuplicate = async (emailValue: string) => {
    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/linkbrary/v1/users/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue }),
      });
      return response.status !== 409;
    } catch (error) {}
  };

  const onSubmit = async (signupData: userSignUpData) => {
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
    } catch (error) {}
  };

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        className={`border ${errors.email ? 'border-red' : 'border-black'} focus:border-blue`}
        id="email"
        placeholder="이메일"
        type="email"
        autoComplete="new-email"
        {...register('email', {
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
      />
      {errors && <p className="font-extrabold">{errors.email?.message}</p>}

      <SendEmail userEmail={emailValue} />

      <label htmlFor="password">비밀번호</label>
      <input
        className={`border ${errors.password ? 'border-red' : 'border-black'} focus:border-blue`}
        id="password"
        placeholder="비밀번호"
        autoComplete="new-password"
        type={isShowPassword ? 'text' : 'password'}
        {...register('password', {
          required: {
            value: true,
            message: '비밀번호를 입력해주세요',
          },
          pattern: {
            value: PASSWORD_REGEX,
            message: '대문자, 특수문자를 최소 하나씩 포함한 8자이상으로 입력해주세요',
          },
        })}
      />
      <div onClick={handleShowPassword}>{isShowPassword ? 'TEXT' : 'PASSWORD'}</div>
      {errors && <p className="font-extrabold">{errors.password?.message}</p>}
      <label htmlFor="passwordCheck">비밀번호 확인</label>
      <input
        className={`border ${errors.passwordCheck ? 'border-red' : 'border-black'} focus:border-blue`}
        id="passwordCheck"
        placeholder="비밀번호 확인"
        type={isShowPasswordCheck ? 'TEXT' : 'PASSWORD'}
        {...register('passwordCheck', {
          required: {
            value: true,
            message: '비밀번호를 입력해주세요.',
          },
          validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
        })}
      />
      <div onClick={handleShowPasswordCheck}>{isShowPasswordCheck ? 'TEXT' : 'PASSWORD'}</div>
      {errors && <p className="font-extrabold">{errors.passwordCheck?.message}</p>}
      <label htmlFor="nickname">닉네임</label>
      <input
        className={`border ${errors.nickname ? 'border-red' : 'border-black'} focus:border-blue`}
        id="nickname"
        placeholder="닉네임"
        {...register('nickname', {
          required: { value: true, message: '닉네임을 입력해주세요' },
        })}
      />
      {errors && <p className="font-extrabold">{errors.nickname?.message}</p>}
      <button type="submit" disabled={!isValid}>
        회원가입
      </button>
    </form>
  );
};

export default SingupContent;
