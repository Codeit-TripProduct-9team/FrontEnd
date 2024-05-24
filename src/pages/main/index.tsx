import CarouselSection from '@/src/components/mainContent/CarouselSection';
import ListSearchSection from '@/src/components/mainContent/ListSearchSection';

const main = () => {
  return (
    <div className="flex flex-col items-center p-100">
      <header>
        <CarouselSection />
      </header>
      <main>
        <ListSearchSection />
      </main>
    </div>
  );
};

export default main;
