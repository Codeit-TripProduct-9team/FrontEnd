import Layout from '../components/common/layout';
import CarouselSection from '@/src/components/mainContent/CarouselSection';
import ListSearchSection from '@/src/components/mainContent/ListSearchSection';
import { useEffect, useState } from 'react';

const main = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;
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
