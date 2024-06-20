import { Place } from '@/src/lib/types';
import ConditionalImage from '../../ConditionalImage';

type PlaceOfDataProps = {
  data: Place;
};
const PlaceOfData = ({ data }: PlaceOfDataProps) => {
  return (
    <div className="flex flex-row justify-between items-center mb-5">
      <p className="p-10 ">
        {data.index}. {data.name}
      </p>
      <ConditionalImage img={data.img} width={154} height={130} />
    </div>
  );
};

export default PlaceOfData;
