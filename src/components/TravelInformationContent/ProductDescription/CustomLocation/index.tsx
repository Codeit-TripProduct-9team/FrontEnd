import LocationInput from './LocationInput';
import RelatedLocation from './RelatedLocation';

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
  showMessage,
  validKeyword,
  relatedLocation,
  changeStartingPoint,
  customStartingPoint,
  handleSelectLocation,
}: CustomLocationProps) => {
  const hasLocation = customLocation.trim() !== '';
  const hasRelatedLocation = relatedLocation.length !== 0;
  const duplicateDestinationAndLocation = relatedLocation[0] === customLocation;
  const duplicateInputLocation = relatedLocation.length === 1;
  const unnecessaryRelatedLocation = duplicateInputLocation && duplicateDestinationAndLocation;

  const showRelatedLocation = hasLocation && hasRelatedLocation && !unnecessaryRelatedLocation;

  const SuccessMessage = `${customLocation}에서 ${destinationName}까지 ${`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`}
              걸려요💨`;

  const FailedMessage = `잘못된 주소이거나 거리가 너무 가깝습니다`;

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-582 p-10 z-10 text-center rounded-s">
      <LocationInput location={customLocation} onChange={changeStartingPoint} onClick={customStartingPoint} />
      {showRelatedLocation && (
        <RelatedLocation relatedLocation={relatedLocation} handleSelectLocation={handleSelectLocation} />
      )}
      {showMessage && (
        <div className="p-10 rounded-s bg-white">
          <p>{validKeyword ? SuccessMessage : FailedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
