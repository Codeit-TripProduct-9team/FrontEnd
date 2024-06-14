import { useEffect, useState } from 'react';

import useGeolocation from 'react-hook-geolocation';

const useMyGeolocation = () => {
  const [startPoint, setStartPoint] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [hasCurrentLocation, setHasCurrentLocation] = useState(true);

  const currentLocation = useGeolocation();
  const accessLocation = currentLocation.error === null;

  useEffect(() => {
    const position = { lat: currentLocation.latitude, lng: currentLocation.longitude };
    if (accessLocation) {
      setHasCurrentLocation(true);
      setStartPoint(position);
    }
    if (!accessLocation) {
      setHasCurrentLocation(false);
    }
  }, [accessLocation, currentLocation.latitude, currentLocation.longitude]);

  return { startPoint, setStartPoint, hasCurrentLocation };
};

export default useMyGeolocation;
