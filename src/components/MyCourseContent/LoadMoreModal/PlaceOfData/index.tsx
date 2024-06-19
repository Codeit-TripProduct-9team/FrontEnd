import { Place } from '@/src/lib/types';

type PlaceOfDataProps = {
  data: Place;
};
const PlaceOfData = ({ data }: PlaceOfDataProps) => {
  return <div>{data.name}</div>;
};

export default PlaceOfData;
