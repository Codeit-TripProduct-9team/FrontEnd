import Image from 'next/image';

import SearchIcon from '@/public/assets/icon/search.png';

interface LocationInputProps {
  location: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationInput = ({ location, onChange }: LocationInputProps) => {
  return (
    <div className="relative p-10 rounded-s bg-white z-10">
      <input
        className="placeholder:text-gray-60 font-bold"
        placeholder="지금 계신 곳을 입력해 주세요!"
        value={location}
        onChange={onChange}
      />
      <Image className="absolute top-10 right-20" src={SearchIcon} width={22} height={22} alt="search" />
    </div>
  );
};

export default LocationInput;
