import { useEffect, useState } from 'react';

import LocationInput from './LocationInput';
import RelatedLocation from './RelatedLocation';

import useDebounce from '@/src/hooks/useDebounce';
import informationPageRequestInstance from '@/src/api/InformationPageRequest';
import { LocationCoordinate } from '@/src/lib/types';

interface CustomLocationProps {
  destinationName: string;
  elapsedTime: {
    hours: number;
    minutes: number;
  };
  setStartPoint: ({ lat, lng }) => void;
}

const CustomLocation = ({ destinationName, elapsedTime, setStartPoint }: CustomLocationProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [relatedLocation, setRelatedLocation] = useState<LocationCoordinate[]>([]);

  const getCoordinate = async (address: string) => {
    try {
      const locationData = await informationPageRequestInstance.getLocation(address);
      const hasCoordinate = locationData.map((location: any) => ({
        address_name: location.address_name,
        lat: parseFloat(location.y),
        lng: parseFloat(location.x),
      }));
      setRelatedLocation(hasCoordinate);
    } catch (error) {
      console.error(error);
    }
  };

  const debounceCustomLocation = useDebounce(customLocation, 500);
  const hasCustomLocation = debounceCustomLocation.trim() !== '';

  useEffect(() => {
    if (hasCustomLocation) {
      getCoordinate(debounceCustomLocation);
    }
    if (!hasCustomLocation) {
      setRelatedLocation([]);
    }
  }, [debounceCustomLocation, hasCustomLocation]);

  const handleSelectLocation = (location: LocationCoordinate) => {
    setCustomLocation(location.address_name);

    setTimeout(() => {
      setStartPoint({ lat: location.lat, lng: location.lng });
      setShowMessage(true);
    }, 300);
  };

  const handleChangeStartingPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    setCustomLocation(location);
    setShowMessage(false);
  };

  const showRelatedLocation = customLocation.trim() !== '' && !showMessage;

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-582 p-10 z-10 text-center rounded-s">
      <LocationInput location={customLocation} onChange={handleChangeStartingPoint} />
      {showRelatedLocation && (
        <RelatedLocation relatedLocation={relatedLocation} handleSelectLocation={handleSelectLocation} />
      )}
      {showMessage && (
        <p className="p-10 rounded-s bg-white">
          {`${customLocation}에서 ${destinationName}까지 ${elapsedTime.hours > 0 ? `${elapsedTime.hours} 시간 ` : ''}${
            elapsedTime.minutes
          } 분 걸려요💨 `}
        </p>
      )}
    </div>
  );
};

export default CustomLocation;
