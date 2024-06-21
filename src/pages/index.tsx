import Layout from '../components/common/layout';
import CarouselSection from '@/src/components/mainContent/CarouselSection';
import ListSearchSection from '@/src/components/mainContent/ListSearchSection';
import { Cookies } from 'react-cookie';

const main = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center py-50 ">
        <header className="scale-85">
          <CarouselSection />
        </header>
        <main>
          <ListSearchSection />
        </main>
      </div>
    </Layout>
  );
};

export default main;
