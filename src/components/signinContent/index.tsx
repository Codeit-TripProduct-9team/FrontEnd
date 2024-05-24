import Image from 'next/image';
import mainLogo from '@/public/assets/icon/mainLogo.png';
import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';
import Input from '@/src/components/common/input';
import Link from 'next/link';
import KakaoSignin from './KakaoSignin';
import NaverSignin from './NaverSignin';
import instance from '@/src/api/axios';
// import { useRouter } from 'next/router';

interface InputForm {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck?: string;
  checkbox?: boolean;
  file?: string;
  nickname?: string;
  verify?: string;
}

const SigninContent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  // const router = useRouter();

  const handleSignin = async (data: InputForm) => {
    try {
      const body = { email: data.email, password: data.password };
      const response = await instance.post('auth/login', body);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        setError('password', { type: 'manual', message: error.response.data.message });
      } else if (error.response.status === 404) {
        setError('email', { type: 'manual', message: error.response.data.message });
      }
    }
  };

  return (
    <main className="flex justify-center items-center h-screen gap-24 relative bottom-100">
      <Image className="modile:w-120" src={mainLogo} alt="mainLogo" width={400} />
      <div className="flex flex-col gap-10">
        <label className="text-24 font-bold text-black">로그인</label>
        <form onSubmit={handleSubmit(handleSignin)}>
          <Input
            register={register('email', {
              required: {
                value: true,
                message: '이메일을 입력해주세요.',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일 형식으로 작성해 주세요.',
              },
            })}
            type="email"
            clearError={clearErrors}
            error={errors.email as FieldError}
            inputName="email"
            inputContent="Email"
            labelId="email"
            focusType="email"
          />
          <PasswordInput
            register={register('password', {
              required: {
                value: true,
                message: '비밀번호를 입력해주세요.',
              },
            })}
            type="password"
            clearError={clearErrors}
            error={errors.password as FieldError}
            inputName="password"
            inputContent="Password"
            labelId="password"
          />
          <div className="flex justify-end items-center gap-8 text-gray-50 text-14">
            <p>
              <Link href="/reset-password">ID/PW 찾기</Link>
            </p>
            <span className="border h-16 " />
            <p>
              <Link href="/signup">회원가입</Link>
            </p>
          </div>
          <Button
            type="submit"
            bgColor="blue"
            textColor="white"
            disabled={Object.keys(errors).length !== 0}
            className="text-20 font-bold h-60 mt-20 mb-30"
          >
            로그인
          </Button>
        </form>
        <div className="flex items-center">
          <hr className="flex-grow border-gray-30 border-1" />
          <span className="px-20 text-gray-50">or</span>
          <hr className="flex-grow border-gray-30 border-1" />
        </div>
        <NaverSignin />
        <KakaoSignin />
      </div>
    </main>
  );
};

export default SigninContent;
