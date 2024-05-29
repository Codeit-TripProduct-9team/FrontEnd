import { useState, useEffect } from 'react';

import Image from 'next/image';

import ProductMap from './ProductMap';
import CurrentLocation from './CurrentLocation';
import useGeolocation from 'react-hook-geolocation';
import CustomLocation from './CustomLocation';
import { placeData } from './mock';

const ProductDescription = () => {
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [hasCurrnetLocation, setHasCurrentLocation] = useState(true);

  const currentLocation = useGeolocation();

  useEffect(() => {
    const accessLocation = currentLocation.error === null;
    if (accessLocation) {
      setHasCurrentLocation(true);
      setStartPoint({ lat: currentLocation.latitude, lng: currentLocation.longitude });
    }
    if (!accessLocation) {
      setHasCurrentLocation(false);
    }
  }, [currentLocation]);

  return (
    <section className="flex flex-col justify-center items-center gap-30">
      <div className="flex flex-col justify-center items-center gap-12">
        <Image
          className="w-full h-455 object-cover"
          width={1440}
          height={455}
          src={placeData.imageSource}
          alt="place-image"
        />
        <h2 className="mt-20 text-20 font-bold">{placeData.title}</h2>
        <p className="text-center ml-284 mr-314">{placeData.description}</p>
        <div className="relative w-622 h-470 my-66 mx-108 rounded-l overflow-hidden">
          {hasCurrnetLocation ? (
            <CurrentLocation
              startPoint={startPoint}
              destinationName={placeData.title}
              destinationPosition={placeData.position}
            />
          ) : (
            <CustomLocation destinationName={placeData.title} destinationPosition={placeData.position} />
          )}

          <ProductMap mapPosition={placeData.position} markerList={placeData.markerPosition} />
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
