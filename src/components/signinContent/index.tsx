import Image from 'next/image';
import kakao from '@/public/assets/icon/kakao.svg';
import naver from '@/public/assets/icon/naver.svg';
// import mainLogo from '@/public/assets/logo/mainLogo.svg';
import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';
import Input from '@/src/components/common/input';
import Link from 'next/link';
// import postUser from '@/src/pages/api/userApi';
// import { useRouter } from 'next/router';

interface InputForm {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck?: string;
  checkbox?: boolean;
  file?: string;
}

const SigninContent = () => {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  // const router = useRouter();

  // const onSubmit = async (data: InputForm) => {
  //   const body = { email: data.email, password: data.password };
  //   const response = await postUser('auth/login', body);
  //   if (response && response.status === 201) {
  //     window.localStorage.setItem('accessToken', response.data.accessToken);
  //     router.push('/my-dashboard');
  //   } else {
  //     setError(response ? response.data.message : '');
  //     handleModal();
  //   }
  // };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-24">
      <header className="flex flex-col items-center gap-10">
        {/* <Image className="modile:w-120" src={mainLogo} alt="mainLogo" /> */}
        {/* <h1 className="text-20 mb-6 font-medium">로그인</h1> */}
      </header>
      <main>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form>
          <div className="pb-16">
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
              inputContent="이메일"
              labelId="email"
              focusType="email"
            />
            <PasswordInput
              register={register('password', {
                required: {
                  value: true,
                  message: '비밀번호를 입력해주세요.',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$&*])(.{8,})$/,
                  message: '8자 이상 입력해 주세요.',
                },
              })}
              type="password"
              clearError={clearErrors}
              error={errors.password as FieldError}
              inputName="password"
              inputContent="비밀번호"
              labelId="password"
            />
          </div>
          <Button type="submit" bgColor="violet" textColor="white" disabled={Object.keys(errors).length !== 0}>
            로그인
          </Button>
        </form>
      </main>
      <p>
        회원이 아니신가요?
        <Link className="underline text-violet pl-10" href="/signup">
          회원가입하기
        </Link>
      </p>
      <Button className="flex justify-center items-center" type="submit" bgColor="yellow" textColor="black">
        <Image src={kakao} alt="kakao signin" width={24} height={24} className="relative right-10" />
        카카오 계정으로 로그인
      </Button>
      <Button className="flex justify-center items-center" type="submit" bgColor="green" textColor="white">
        <Image src={naver} alt="kakao signin" width={24} height={24} className="relative right-10" />
        네이버 계정으로 로그인
      </Button>
    </div>
  );
};

export default SigninContent;
