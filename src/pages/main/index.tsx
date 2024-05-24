import CarouselSection from '@/src/components/mainContent/CarouselSection';
// import ListCard from '@/src/components/mainContent/ListCard';
import ListSearchInput from '@/src/components/mainContent/ListSearchInput';
import { mock } from '@/src/components/mainContent/mock';

const main = () => {
  return (
    <div className="flex flex-col items-center p-100">
      <header>
        <CarouselSection data={mock.data} />
      </header>
      <main>
        <article>
          <ListSearchInput />
          <div className="mt-20">
            <h1 className="text-center text-20 font-bold">검색유도문구</h1>
            <p className="text-center text-15">description</p>
          </div>
        </article>
        {/* <ListCard/> */}
      </main>
    </div>
  );
};

export default main;
