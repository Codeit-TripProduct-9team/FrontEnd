import { Place } from '@/src/lib/types';

type PlaceOfDataProps = {
  data: Place;
};
const PlaceOfData = ({ data }: PlaceOfDataProps) => {
  return (
    <div className="flex flex-row justify-between items-center mb-5">
      <p className="p-10 ">
        {data.index}. {data.name}
      </p>
    </div>
  );
};

export default PlaceOfData;
