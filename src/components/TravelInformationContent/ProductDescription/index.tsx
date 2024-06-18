import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import useDebounce from '@/src/hooks/useDebounce';
import convertTime from '@/src/utils/convertTime';
import instance from '@/src/api/axios';
import { BASED_URL, TOAST_MESSAGE } from '@/src/constants/constants';
import useMyGeolocation from '@/src/hooks/useMyGeolocation';
import useDestinationDirection from '@/src/hooks/useDestinationDirection';
import { placeData } from './mock';

const ProductDescription = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [validKeyword, setValidKeyword] = useState(true);
  const [customLocation, setCustomLocation] = useState('');
  const [relatedLocation, setRelatedLocation] = useState([]);
  const [searchCoordinate, setSearchCoordinate] = useState({ lat: 0, lng: 0 });

  const { startPoint, setStartPoint, hasCurrentLocation } = useMyGeolocation();
  const { polylinePath, duration } = useDestinationDirection(startPoint, placeData.position);

  const debounceCustomLocation = useDebounce(customLocation, 500);

  const getMyCoordinate = async (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    try {
      const response = await instance.get(
        `${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${encodedAddress}`,
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

  useEffect(() => {
    const hasCustomLocation = debounceCustomLocation.trim() !== '';
    if (hasCustomLocation) {
      getMyCoordinate(debounceCustomLocation);
    }
    if (!hasCustomLocation) {
      setRelatedLocation([]);
    }
  }, [debounceCustomLocation]);

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

  const handleSelectLocation = (location: string) => {
    setCustomLocation(location);
    setRelatedLocation([]);

    setTimeout(() => {
      handleStartingPoint();
    }, 300);
  };

  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <LocationDescription placeData={placeData} />
        <div className="relative w-822 h-670 my-66 mx-108 rounded-l overflow-hidden">
          {hasCurrentLocation ? (
            <CurrentLocation
              startPoint={startPoint}
              destinationName={placeData.title}
              elapsedTime={convertTime(duration)}
            />
          ) : (
            <CustomLocation
              destinationName={placeData.title}
              customLocation={customLocation}
              elapsedTime={convertTime(duration)}
              changeStartingPoint={(changelocation) => handleChangeStartingPoint(changelocation)}
              customStartingPoint={() => handleStartingPoint()}
              showMessage={showMessage}
              validKeyword={validKeyword}
              relatedLocation={relatedLocation}
              handleSelectLocation={handleSelectLocation}
            />
          )}
          <ProductMap
            startPoint={startPoint}
            position={placeData.position}
            polylinePath={polylinePath}
            place={placeData.title}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
