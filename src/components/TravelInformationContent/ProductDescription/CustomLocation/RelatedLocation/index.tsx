import { LocationCoordinate } from '@/src/lib/types';

interface RelatedLocationProps {
  relatedLocation: Array<LocationCoordinate>;
  handleSelectLocation: (location: LocationCoordinate) => void;
}

const RelatedLocation = ({ relatedLocation, handleSelectLocation }: RelatedLocationProps) => {
  const hasRelatedLocation = relatedLocation.length !== 0;

  return hasRelatedLocation ? (
    <ul className="max-h-120 rounded-s bg-white overflow-y-auto">
      {relatedLocation.map((location: LocationCoordinate, index: number) => (
        <li className="p-10 hover:bg-gray-20 cursor-pointer" key={index} onClick={() => handleSelectLocation(location)}>
          {location.address_name}
        </li>
      ))}
    </ul>
  ) : (
    <p className="p-10 rounded-s bg-white"> 검색결과가 없습니다.</p>
  );
};

export default RelatedLocation;
