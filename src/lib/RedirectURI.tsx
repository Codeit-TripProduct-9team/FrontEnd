import { useRouter } from 'next/router';
import { useEffect } from 'react';
import instance from '../api/axios';
import { openToast } from '../utils/openToast';
import { setCookie } from '../utils/cookie';
import { TOAST_MESSAGE } from '@/src/constants/constants';

const RedirectURI = () => {
  const router = useRouter();
  useEffect(() => {
    const handleSignin = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      try {
        const body = { code: code };
        console.log(body);
        const response = await instance.post('/auth/kakao/login', body);
        console.log(response);
        if (response.status === 200) {
          const accessToken = response.data.data.accessToken;
          openToast.success(TOAST_MESSAGE.LOGIN);
          setCookie('accessToken', accessToken, {
            path: '/',
          });
          router.push('/');
        }
      } catch (error: any) {
        console.log(error);
        // if (error.response.status === 400 || error.response.status === 404) {
        //   // setErrorText(error.response.data.message);
        //   OnModal(error.response.data.message);
        // }
      }
    };
    handleSignin();
  }, [router]);
  return <div>ㅇㅇ</div>;
};

export default RedirectURI;
