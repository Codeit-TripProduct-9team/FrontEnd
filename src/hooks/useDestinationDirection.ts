import { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import getDirection from '../utils/getDireciton';

import { placeData } from '../components/TravelInformationContent/ProductDescription/mock';

const useDestinationDirection = () => {
  const [duration, setDuration] = useState(0);
  const [startPoint, setStartPoint] = useState({ lat: 0, lng: 0 });
  const [polylinePath, setPolylinePath] = useState<{ lat: number; lng: number }[]>([]);
  const [hasCurrentLocation, setHasCurrentLocation] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [validKeyword, setValidKeyword] = useState(true);
  const [customLocation, setCustomLocation] = useState('');

  const currentLocation = useGeolocation();

  const accessLocation = currentLocation.error === null;
  const isValidCoordinate = startPoint && startPoint.lat !== 0 && startPoint.lng !== 0;

  useEffect(() => {
    if (accessLocation) {
      setHasCurrentLocation(true);
      setStartPoint({ lat: currentLocation.latitude, lng: currentLocation.longitude });
    } else {
      setHasCurrentLocation(false);
    }
  }, [accessLocation, currentLocation.latitude, currentLocation.longitude]);

  useEffect(() => {
    if (isValidCoordinate) {
      const getRoute = async () => {
        const directionData = await getDirection(startPoint, placeData.position);
        if (directionData) {
          const { path, elapsedTime } = directionData;
          setPolylinePath(path);
          setDuration(elapsedTime);
        }
      };
      getRoute();
    }
  }, [isValidCoordinate, startPoint]);

  return {
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
  };
};

export default useDestinationDirection;
