interface RelatedLocationProps {
  relatedLocation: Array<string>;
  handleSelectLocation: (location: string) => void;
}

const RelatedLocation = ({ relatedLocation, handleSelectLocation }: RelatedLocationProps) => {
  return (
    <ul className="max-h-120  rounded-s bg-white  overflow-y-auto">
      {relatedLocation.map((location: string, index) => (
        <li className="p-10 hover:bg-gray-20 cursor-pointer" key={index} onClick={() => handleSelectLocation(location)}>
          {location}
        </li>
      ))}
    </ul>
  );
};

export default RelatedLocation;
