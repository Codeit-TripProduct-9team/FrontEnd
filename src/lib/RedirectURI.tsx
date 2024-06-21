import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import instance from '../api/axios';
import { openToast } from '../utils/openToast';
import { setCookie } from '../utils/cookie';
import { TOAST_MESSAGE } from '@/src/constants/constants';
import { userDataStore } from '../utils/zustand/userDataStore';
import Image from 'next/image';
import loginLogo from '@/public/assets/icon/loginLogo.png';
import { Toaster } from 'react-hot-toast';

const RedirectURI = () => {
  const { setUserData, userData } = userDataStore();
  console.log(userData);
  const router = useRouter();

  useEffect(() => {
    const handleSignin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      try {
        const body = { code: code };
        console.log(code);
        let url = '/auth/kakao/login';
        if (code.length <= 30) {
          url = '/auth/naver/login';
        }
        const response = await instance.post(url, body);
        if (response.status === 200) {
          const userData = response.data;
          openToast.success(TOAST_MESSAGE.LOGIN);
          setUserData({
            id: userData.id,
            nickname: userData.nickname,
            email: userData.email,
          });
          const accessToken = response.data.accessToken;
          console.log(userData);
          console.log(accessToken);
          setCookie('userId', userData.id);
          setCookie('nickname', userData.nickname);
          setCookie('accessToken', accessToken, {
            path: '/',
          });
          setTimeout(() => router.push('/'), 3000);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    handleSignin();
  }, [router, setUserData]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="bottom-center" />
      <div className="flex items-center flex-col gap-20">
        <div className="mb-20">
          <Image src={loginLogo} width={150} height={150} alt="로그인로고" />
        </div>
        <h1 className="text-50 text-center">
          안녕하세요 <span className="font-bold text-blue">{userData.nickname}</span>님!
        </h1>
        <div className="flex text-60 items-center justify-center gap-10 ">
          <h1 className="mt-20">유트립에 오신것을 환영해요!</h1>
        </div>
        <div className="flex gap-20 mt-30">
          <div className="w-20 h-20 bg-blue rounded-full animate-bounceOnce" style={{ animationDelay: '0s' }}></div>
          <div className="w-20 h-20 bg-blue rounded-full animate-bounceOnce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-20 h-20 bg-blue rounded-full animate-bounceOnce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default RedirectURI;
