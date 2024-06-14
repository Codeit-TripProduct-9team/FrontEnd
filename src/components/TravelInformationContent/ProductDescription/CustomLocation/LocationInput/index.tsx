import Image from 'next/image';

import SearchIcon from '@/public/assets/icon/search.png';
import useAutoFocus from '@/src/hooks/useAtuoFocus';
import { useRef } from 'react';

interface LocationInputProps {
  location: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const LocationInput = ({ location, onChange, onClick }: LocationInputProps) => {
  const focusRef = useRef<HTMLInputElement>(null);

  useAutoFocus(focusRef);

  return (
    <div className="relative p-10 rounded-s bg-white z-10">
      <input
        ref={focusRef}
        className="placeholder:text-gray-60 font-bold"
        placeholder="지금 계신 곳을 입력해 주세요!"
        value={location}
        onChange={onChange}
      />
      <button onClick={onClick}>
        <Image className="absolute top-10 right-20" src={SearchIcon} width={22} height={22} alt="search" />
      </button>
    </div>
  );
};

export default LocationInput;
