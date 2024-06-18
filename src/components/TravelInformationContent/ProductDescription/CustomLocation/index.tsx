import instance from '@/src/api/axios';
import LocationInput from './LocationInput';
import RelatedLocation from './RelatedLocation';
import { BASED_URL, TOAST_MESSAGE } from '@/src/constants/constants';
import { useEffect, useState } from 'react';
import useDebounce from '@/src/hooks/useDebounce';
import toast from 'react-hot-toast';

interface CustomLocationProps {
  destinationName: string;
  elapsedTime: {
    hours: number;
    minutes: number;
  };
  setStartPoint: ({ lat, lng }) => void;
  isLoadingDirection: boolean;
}
const CustomLocation = ({ destinationName, elapsedTime, setStartPoint, isLoadingDirection }: CustomLocationProps) => {
  const [showMessage, setShowMessage] = useState(false);
  const [validKeyword, setValidKeyword] = useState(true);
  const [customLocation, setCustomLocation] = useState('');
  const [relatedLocation, setRelatedLocation] = useState([]);
  const [searchCoordinate, setSearchCoordinate] = useState({ lat: 0, lng: 0 });

  const getMyCoordinate = async (address: string) => {
    try {
      const response = await instance.get(
        `${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${address}`,
        { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}` } },
      );
      const hasCoordinate = response.data.documents;
      const searchLoaction = response.data.documents[0];

      if (hasCoordinate.length === 0) {
        setValidKeyword(false);
      }

      if (hasCoordinate.length !== 0) {
        setSearchCoordinate({ lat: parseFloat(searchLoaction.y), lng: parseFloat(searchLoaction.x) });
        setRelatedLocation(hasCoordinate.map((location) => location.address_name));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debounceCustomLocation = useDebounce(customLocation, 500);

  useEffect(() => {
    const hasCustomLocation = debounceCustomLocation.trim() !== '';
    if (hasCustomLocation) {
      getMyCoordinate(debounceCustomLocation);
    }
    if (!hasCustomLocation) {
      setRelatedLocation([]);
    }
  }, [debounceCustomLocation]);

  const handleSelectLocation = (location: string) => {
    setCustomLocation(location);
    setRelatedLocation([]);

    setTimeout(() => {
      handleStartingPoint();
    }, 300);
  };

  const handleStartingPoint = () => {
    const hasCustomLocation = customLocation.trim() !== '';
    if (!hasCustomLocation) {
      toast.error(TOAST_MESSAGE.EMPTY_LOCATION);
    }

    if (hasCustomLocation) {
      if (searchCoordinate === null) {
        setValidKeyword(false);
      }
      if (searchCoordinate !== null) {
        setValidKeyword(true);
        setStartPoint(searchCoordinate);
      }

      setShowMessage(true);
    }
  };

  const handleChangeStartingPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    setShowMessage(false);
    setCustomLocation(location);
  };

  const hasLocation = customLocation.trim() !== '';
  const hasRelatedLocation = relatedLocation.length !== 0;

  const duplicateInputLocation = relatedLocation.length === 1;
  const duplicateDestinationAndLocation = relatedLocation[0] === customLocation;
  const unnecessaryRelatedLocation = duplicateInputLocation && duplicateDestinationAndLocation;

  const showRelatedLocation = hasLocation && hasRelatedLocation && !unnecessaryRelatedLocation;

  const LoadingDuration = isLoadingDirection
    ? '시간을 계산 중입니다...'
    : `${`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`} 걸려요💨`;

  const SuccessMessage = `${customLocation}에서 ${destinationName}까지 ${LoadingDuration} `;

  const FailedMessage = `잘못된 주소이거나 거리가 너무 가깝습니다`;

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 w-582 p-10 z-10 text-center rounded-s">
      <LocationInput location={customLocation} onChange={handleChangeStartingPoint} onClick={handleStartingPoint} />
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
