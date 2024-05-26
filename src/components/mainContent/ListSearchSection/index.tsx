import ListCard from '../../common/ListCard';
import { mock } from '@/src/components/mainContent/mock';

const ListSearchSection = () => {
  const GRID_ROW = Math.ceil(mock.data.length / 4);
  console.log(GRID_ROW);
  return (
    <article className="flex flex-col items-center">
      <div className="mb-20">
        <h1 className="text-center text-40 font-bold">검색유도문구</h1>
        <p className="text-center text-20">description</p>
      </div>
      <input
        className="text-center border-2 rounded-15 w-800 py-10 px-30 mb-30 "
        placeholder="원하는여행지, 유튜버, 테마를 검색해보세요"
      />
      <div className={`grid grid-cols-4 grid-rows-${GRID_ROW} gap-40`}>
        {mock.data.map((datas, index) => (
          <ListCard key={index} data={datas} />
        ))}
      </div>
    </article>
  );
};

export default ListSearchSection;
