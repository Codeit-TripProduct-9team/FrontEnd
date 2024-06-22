import dynamic from 'next/dynamic';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
import { getCookie } from '@/src/utils/cookie';
import { setCookie } from '@/src/utils/cookie';
import instance from '@/src/api/axios';
import { useEffect } from 'react';
import { openToast } from '@/src/utils/openToast';
import { TOAST_MESSAGE } from '@/src/constants/constants';

const Header = dynamic(() => import('./Header'), { ssr: false });

const Layout = ({ children, hasFooter = true }: { children: React.ReactNode; hasFooter?: boolean }) => {
  useEffect(() => {
    const INTERVAL = 30 * 60 * 1000; // 30 min interval
    const updateTokens = async () => {
      const refreshToken = getCookie('refreshToken');
      if (refreshToken === undefined) {
        openToast.error(TOAST_MESSAGE.RELOGIN);
        return;
      }
      try {
        const response = await instance.patch('/auth/reissue', { refresh_token: refreshToken });
        const updatedRefreshToken = response.data.data.refreshToken;
        const updatedAccessToken = response.data.data.accessToken;
        setCookie('accessToken', updatedAccessToken);
        setCookie('refreshToken', updatedRefreshToken);
      } catch (error) {
        console.error('Error updating tokens', error);
      }
    };
    // Set timeout to skip the first 30 minutes after login
    const timeoutId = setTimeout(() => {
      updateTokens();
      // Then set interval to call refreshToken every 30 minutes
      const intervalId = setInterval(updateTokens, INTERVAL);
      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }, INTERVAL);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-10">
        {children}
        <Toaster position="bottom-center" />
      </main>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Layout;
