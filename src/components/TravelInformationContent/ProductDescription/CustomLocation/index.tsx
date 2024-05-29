import { ChangeEvent, useState, useEffect, useCallback } from 'react';

import Image from 'next/image';

import SearchIcon from '@/public/assets/icon/search.png';
import convertTime from '@/src/utils/convertTime';

interface ElaspedTimeProps {
  destinationName: string;
  destinationPosition: { lat: number; lng: number };
  startPoint?: { lat: number; lng: number };
}

const CustomLocation = ({ destinationName, destinationPosition }: ElaspedTimeProps) => {
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState(0);
  const [coordinate, setCoordinate] = useState({ lng: '', lat: '' });
  const [showMessage, setShowMessage] = useState(false);

  const getCoordinate = useCallback(async (address: string) => {
    const encodedAddress = encodeURIComponent(address);

    const REST_API_KEY = 'cc81aff4a39ec9dc0f2227e92f473f24';
    const url = `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&query=${encodedAddress}`;

    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      const data = await response.json();
      const customLocation = data.documents[0];
      setCoordinate({ lat: customLocation.y, lng: customLocation.x });
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  const getDirection = useCallback(async () => {
    const REST_API_KEY = 'cc81aff4a39ec9dc0f2227e92f473f24';
    const directionUrl = 'https://apis-navi.kakaomobility.com/v1/directions';

    const origin = `${coordinate.lng},${coordinate.lat}`;
    const destination = `${destinationPosition.lng},${destinationPosition.lat}`;

    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const queryParams = new URLSearchParams({
      origin: origin,
      destination: destination,
    });

    const requestUrl = `${directionUrl}?${queryParams}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'GET',
        headers: headers,
      });

      const data = await response.json();

      const elapsedTime = data.routes[0].summary.duration;
      setDuration(elapsedTime);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [coordinate.lat, coordinate.lng, destinationPosition.lat, destinationPosition.lng]);

  useEffect(() => {
    if (location.trim() !== '') {
      getCoordinate(location);
    }
  }, [location, getCoordinate]);

  useEffect(() => {
    if (coordinate.lng !== '' && coordinate.lat !== '') {
      getDirection();
    }
  }, [coordinate, getDirection]);

  const handleMessage = () => {
    if (location.trim() !== '') {
      setShowMessage(true);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (showMessage) {
      setShowMessage(false);
    }
    setLocation(event.target.value);
  };

  const durationTime = convertTime(duration);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex flex-col gap-4  w-582 p-10 z-10 text-center rounded-s">
      <div className="relative p-10  rounded-s bg-white">
        <input
          className="placeholder:text-gray-60 font-bold"
          placeholder="지금 계신 곳을 입력해 주세요!"
          value={location}
          onChange={handleInputChange}
        />
        <button onClick={handleMessage}>
          <Image className="absolute top-10 right-20" src={SearchIcon} width={22} height={22} alt="search" />
        </button>
      </div>
      {showMessage && (
        <div className="p-10  rounded-s bg-white">
          <p>
            {location}에서 {destinationName}까지 {`${durationTime.hours} 시간 ${durationTime.minutes} 분`} 걸려요💨
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomLocation;
