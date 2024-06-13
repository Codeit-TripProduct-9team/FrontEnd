import useDestinationDirection from '@/src/hooks/useDestinationDirection';
import { handleStartingPoint, handleChangeStartingPoint } from '@/src/utils/handleLocation';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import CustomLocation from './CustomLocation';
import LocationDescription from './LoactionDescription';

import convertTime from '@/src/utils/convertTime';
import { placeData } from './mock';

const ProductDescription = () => {
  const {
    duration,
    startPoint,
    polylinePath,
    hasCurrentLocation,
    showMessage,
    validKeyword,
    customLocation,
    setShowMessage,
    setValidKeyword,
    setCustomLocation,
    setStartPoint,
    setDuration,
    setPolylinePath,
  } = useDestinationDirection();

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
              changeStartingPoint={(event) => handleChangeStartingPoint(event, setCustomLocation, setShowMessage)}
              customStartingPoint={() =>
                handleStartingPoint(
                  customLocation,
                  setValidKeyword,
                  setStartPoint,
                  setDuration,
                  setPolylinePath,
                  setShowMessage,
                )
              }
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
