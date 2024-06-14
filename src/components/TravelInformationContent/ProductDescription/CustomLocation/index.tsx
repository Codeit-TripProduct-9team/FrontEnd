import LocationInput from './LocationInput';

interface CustomLocationProps {
  destinationName: string;
  elapsedTime: {
    hours: number;
    minutes: number;
  };
  customLocation: string;
  changeStartingPoint: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customStartingPoint: () => void;
  showMessage: boolean;
  validKeyword: boolean;
  relatedLocation: Array<string>;
  handleSelectLocation: (location: string) => void;
}
const CustomLocation = ({
  destinationName,
  elapsedTime,
  customLocation,
  changeStartingPoint,
  customStartingPoint,
  showMessage,
  validKeyword,
  relatedLocation,
  handleSelectLocation,
}: CustomLocationProps) => {
  const showRelatedLocation =
    customLocation.trim() !== '' &&
    relatedLocation.length !== 0 &&
    !(relatedLocation.length === 1 && relatedLocation[0] === customLocation);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-582 p-10 z-10 text-center rounded-s">
      <LocationInput location={customLocation} onChange={changeStartingPoint} onClick={customStartingPoint} />
      {showRelatedLocation && (
        <ul className="max-h-120  rounded-s bg-white  overflow-y-auto">
          {relatedLocation.map((location: string, index) => (
            <li
              className="p-10 hover:bg-gray-20 cursor-pointer"
              key={index}
              onClick={() => handleSelectLocation(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
      {showMessage && (
        <div className="p-10 rounded-s bg-white">
          {validKeyword ? (
            <p>
              {customLocation}에서 {destinationName}까지 {`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`}
              걸려요💨
            </p>
          ) : (
            <p>잘못된 주소이거나 거리가 너무 가깝습니다</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
