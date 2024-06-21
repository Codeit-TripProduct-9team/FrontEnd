import PasswordInput from '@/src/components/common/input/passwordInput';
import Button from '@/src/components/common/button';
import { FieldError, useForm } from 'react-hook-form';
import Input from '@/src/components/common/input';
import Link from 'next/link';
import KakaoSignin from './KakaoSignin';
import NaverSignin from './NaverSignin';
import instance from '@/src/api/axios';
// import { useState } from 'react';
import { useOverlay } from '@toss/use-overlay';
import Modal from '../common/modal';
import ModalContent from '../common/modal/ModalContent';
import { MODAL_MESSAGE, TOAST_MESSAGE } from '../../constants/constants';
import { openToast } from '@/src/utils/openToast';
import { useRouter } from 'next/router';
import { setCookie } from '@/src/utils/cookie';
import { userDataStore } from '@/src/utils/zustand/userDataStore';

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
  // const [errorText, setErrorText] = useState<string>('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<InputForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const { setUserData } = userDataStore();

  const router = useRouter();

  //모달 사용
  const overlay = useOverlay();
  const OnModal = (text: string) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} close={close}>
        <ModalContent emoji={'🥺'} modalType={MODAL_MESSAGE.FAIL_LOGIN} modalText={text} />
      </Modal>
    ));
  };

  const handleSignin = async (data: InputForm) => {
    try {
      const body = { email: data.email, password: data.password };
      const response = await instance.post('/auth/login', body);
      if (response.status === 200) {
        const userData = response.data.data;

        setUserData({
          id: userData.id,
          nickname: userData.nickname,
          email: userData.email,
        });

        const accessToken = response.data.data.token.accessToken;
        openToast.success(TOAST_MESSAGE.LOGIN);
        setCookie('userId', userData.id);
        setCookie('nickname', userData.nickname);
        setCookie('accessToken', accessToken, {
          path: '/',
        });
        router.push('/');
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 404) {
        // setErrorText(error.response.data.message);
        OnModal(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 w-408">
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
          <Button disabled={Object.keys(errors).length !== 0} className="text-20 font-bold h-60 mt-20 mb-30">
            로그인
          </Button>
        </form>
        <div className="flex items-center">
          <hr className="flex-grow border-gray-30 border-1" />
          <span className="px-20 text-gray-50 text-14">or</span>
          <hr className="flex-grow border-gray-30 border-1" />
        </div>
        <NaverSignin />
        <KakaoSignin />
      </div>
    </>
  );
};

export default SigninContent;
