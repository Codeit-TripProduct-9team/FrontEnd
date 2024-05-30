import { SetStateAction, ChangeEvent, useState, useEffect, useCallback } from 'react';

import Image from 'next/image';

import SearchIcon from '@/public/assets/icon/search.png';
import convertTime from '@/src/utils/convertTime';
import getDirectionRequest from '@/src/utils/getDirectionRequest';

import instance from '@/src/api/axios';

interface ElaspedTimeProps {
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  startPoint?: { lat: number; lng: number };
  setPolylinePath: React.Dispatch<SetStateAction<{ lat: number; lng: number }[]>>;
  setCustomStartPoint: React.Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}

const CustomLocation = ({
  destinationName,
  destinationPosition,
  setPolylinePath,
  setCustomStartPoint,
}: ElaspedTimeProps) => {
  const [invalidKeyword, setInvalidKeyword] = useState(0);
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(0);
  const [coordinate, setCoordinate] = useState({ lng: '', lat: '' });
  const [showMessage, setShowMessage] = useState(false);

  const getCoordinate = useCallback(
    async (address: string) => {
      const encodedAddress = encodeURIComponent(address);

      const REST_API_KEY = 'cc81aff4a39ec9dc0f2227e92f473f24';
      const url = `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&query=${encodedAddress}`;

      try {
        const response = await instance.get(url, {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.data;
        const customLocation = responseData.documents[0];
        setCoordinate({ lat: customLocation.y, lng: customLocation.x });
        setCustomStartPoint({ lat: customLocation.y, lng: customLocation.x });
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [setCustomStartPoint],
  );

  const getDirection = useCallback(async () => {
    const { requestUrl, headers } = getDirectionRequest(coordinate, destinationPosition);
    try {
      const response = await instance.get(requestUrl, {
        headers: headers,
      });

      const responseData = await response.data;
      const elapsedTime = responseData.routes[0].summary.duration;
      const linePath: { lat: number; lng: number }[] = [];
      responseData.routes[0].sections[0].roads.forEach((route: any) => {
        route.vertexes.forEach((vertex: any, index: number) => {
          if (index % 2 === 0) {
            linePath.push({
              lat: route.vertexes[index + 1],
              lng: route.vertexes[index],
            });
          }
        });
      });
      setPolylinePath(linePath);
      setInvalidKeyword(responseData.totalCount);
      setDuration(elapsedTime);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [coordinate, destinationPosition, setPolylinePath]);

  useEffect(() => {
    const hasLocation = location.trim() !== '';
    if (hasLocation) {
      getCoordinate(location);
    }
  }, [location, getCoordinate]);

  useEffect(() => {
    const hasCoordinate = coordinate.lng !== '' && coordinate.lat !== '';
    if (hasCoordinate) {
      getDirection();
    }
  }, [coordinate, getDirection]);

  const handleStartingPoint = () => {
    const hasLocation = location.trim() !== '';
    if (hasLocation) {
      setShowMessage(true);
    }
  };

  const handleChangeStartingPoint = (event: ChangeEvent<HTMLInputElement>) => {
    const customLocation = event.target.value;
    if (showMessage) {
      setShowMessage(false);
    }
    setLocation(customLocation);
  };

  const elapsedTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4  w-582 p-10 z-10 text-center rounded-s">
      <div className="relative p-10  rounded-s bg-white">
        <input
          className="placeholder:text-gray-60 font-bold"
          placeholder="지금 계신 곳을 입력해 주세요!"
          value={location}
          onChange={handleChangeStartingPoint}
        />
        <button onClick={handleStartingPoint}>
          <Image className="absolute top-10 right-20" src={SearchIcon} width={22} height={22} alt="search" />
        </button>
      </div>
      {showMessage && (
        <div className="p-10  rounded-s bg-white">
          {invalidKeyword === 0 ? (
            <p>잘못된 주소이거나 거리가 너무 가깝습니다</p>
          ) : (
            <p>
              {location}에서 {destinationName}까지 {`${elapsedTime.hours} 시간 ${elapsedTime.minutes} 분`} 걸려요💨
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
