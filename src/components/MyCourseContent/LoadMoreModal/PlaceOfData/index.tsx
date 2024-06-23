import { Place } from '@/src/lib/types';
import ConditionalImage from '../../ConditionalImage';

type PlaceOfDataProps = {
  data: Place;
};
const PlaceOfData = ({ data }: PlaceOfDataProps) => {
  const getValidImageUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.href;
    } catch (e) {
      console.error('Invalid image URL', url);
      return '';
    }
  };
  return (
    <div className="flex flex-row justify-between items-center mb-5">
      <p className="p-10 ">
        {data.index}. {data.name}
      </p>
      <ConditionalImage img={getValidImageUrl(data.img)} className="w-154 h-120" />
    </div>
  );
};

export default PlaceOfData;
