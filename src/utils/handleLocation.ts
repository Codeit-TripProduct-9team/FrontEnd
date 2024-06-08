import getDirection from './getDireciton';
import getCoordinate from '@/src/utils/getCoordinate';
import { placeData } from '../components/TravelInformationContent/ProductDescription/mock';

export const handleStartingPoint = async (
  customLocation: string,
  setValidKeyword: (valid: boolean) => void,
  setStartPoint: (point: { lat: number; lng: number }) => void,
  setDuration: (duration: number) => void,
  setPolylinePath: (path: { lat: number; lng: number }[]) => void,
  setShowMessage: (show: boolean) => void,
) => {
  if (customLocation.trim() !== '') {
    const coordinate = await getCoordinate(customLocation);

    if (coordinate === null) {
      setValidKeyword(false);
    }

    if (coordinate) {
      const directionData = await getDirection(coordinate, placeData.position);
      if (directionData) {
        const { path, elapsedTime } = directionData;
        setStartPoint(coordinate);
        setDuration(elapsedTime);
        setPolylinePath(path);
        setValidKeyword(true);
      }
    }

    setShowMessage(true);
  }
};

export const handleChangeStartingPoint = (
  event: React.ChangeEvent<HTMLInputElement>,
  setCustomLocation: (location: string) => void,
  setShowMessage: (show: boolean) => void,
) => {
  const location = event.target.value;
  setShowMessage(false);
  setCustomLocation(location);
};
