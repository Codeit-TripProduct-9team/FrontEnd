import { useState } from 'react';
import useMyGeolocation from '@/src/hooks/useMyGeolocation';
import useDestinationDirection from '@/src/hooks/useDestinationDirection';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import convertTime from '@/src/utils/convertTime';
import instance from '@/src/api/axios';
import { BASED_URL } from '@/src/constants/constants';
import { placeData } from './mock';

const ProductDescription = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [validKeyword, setValidKeyword] = useState(true);
  const [customLocation, setCustomLocation] = useState('');

  const { startPoint, setStartPoint, hasCurrentLocation } = useMyGeolocation();
  const { polylinePath, duration } = useDestinationDirection(startPoint, placeData.position);

  const getMyCoordinate = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    const encodedAddress = encodeURIComponent(address);
    try {
      const response = await instance.get(
        `${BASED_URL.KAKAO_ROAD}/local/search/address.json?analyze_type=similar&query=${encodedAddress}`,
        { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO_REST}` } },
      );
      const customLocation = response.data.documents[0];
      return { lat: parseFloat(customLocation.y), lng: parseFloat(customLocation.x) };
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleStartingPoint = async () => {
    if (customLocation.trim() !== '') {
      const coordinate = await getMyCoordinate(customLocation);

      if (coordinate === null) {
        setValidKeyword(false);
      }
      if (coordinate !== null) {
        setValidKeyword(true);
        setStartPoint(coordinate);
      }

      setShowMessage(true);
    }
  };

  const handleChangeStartingPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    setShowMessage(false);
    setCustomLocation(location);
  };

  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <LocationDescription placeData={placeData} />
        <div className="relative w-622 h-470 my-66 mx-108 rounded-l overflow-hidden">
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
            />
          )}
          <ProductMap startPoint={startPoint} position={placeData.position} polylinePath={polylinePath} />
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
