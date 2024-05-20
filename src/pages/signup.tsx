import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface useSignUpData {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>?,./~`-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>?,./~`-]{8,}$/;

const Singup = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordCheck, setIsShowPasswordCheck] = useState(false);

  const route = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<useSignUpData>({ mode: 'onBlur' });

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

  const onSubmit = async (signupData: useSignUpData) => {
    try {
      const response = await fetch('https://bootcamp-api.codeit.kr/api/linkbrary/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        route.push('/signin');
      }
    } catch (error) {}
  };

  return (
    <form className="flex flex-col gap-20" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        placeholder="이메일"
        type="email"
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
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        placeholder="비밀번호"
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
      <div onClick={handleShowPassword}>{isShowPassword ? '텍스트' : '비밀번호'}</div>
      {errors && <p className="font-extrabold">{errors.password?.message}</p>}
      <label htmlFor="passwordCheck">비밀번호 확인</label>
      <input
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
        id="nickname"
        placeholder="닉네임"
        {...register('nickname', {
          required: { value: true, message: '닉네임을 입력해주세요' },
        })}
      />
      {errors && <p className="font-extrabold">{errors.nickname?.message}</p>}
      <button>회원가입</button>
    </form>
  );
};

export default Singup;
