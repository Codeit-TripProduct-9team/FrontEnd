import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, hasFooter = true }: { children: React.ReactNode; hasFooter?: boolean }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-10">{children}</main>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Layout;
