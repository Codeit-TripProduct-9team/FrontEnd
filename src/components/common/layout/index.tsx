import dynamic from 'next/dynamic';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Header = dynamic(() => import('./Header'), { ssr: false });

const Layout = ({ children, hasFooter = true }: { children: React.ReactNode; hasFooter?: boolean }) => {
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
