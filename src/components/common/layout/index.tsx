import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, hasFooter = true }: { children: React.ReactNode; hasFooter?: boolean }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-gray-10">{children}</div>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Layout;
