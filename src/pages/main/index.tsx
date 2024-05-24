import CarouselSection from '@/src/components/mainContent/CarouselSection';
// import ListCard from '@/src/components/mainContent/ListCard';
// import ListSearchInput from '@/src/components/mainContent/ListSearchInput';
import { mock } from '@/src/components/mainContent/mock';

const main = () => {
  return (
    <div className="flex flex-col  p-100">
      <header>
        <CarouselSection data={mock.data} />
      </header>
      {/* <main>
        <article>
          <ListSearchInput />
          <div>
            <h1>검색유도문구</h1>
            <p>description</p>
            <ListCard/>
          </div>
        </article>
      </main> */}
    </div>
  );
};

export default main;
