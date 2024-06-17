import { PlaceData } from '../../types';

type PlaceOfDataProps = {
  data: PlaceData;
};
const PlaceOfData = ({ data }: PlaceOfDataProps) => {
  return <div>{data.name}</div>;
};

export default PlaceOfData;
