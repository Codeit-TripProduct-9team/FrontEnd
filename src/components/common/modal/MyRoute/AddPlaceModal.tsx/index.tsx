import SearchBar from '@/src/components/MyRouteContent/SearchBar';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { MockDataItem } from '@/src/lib/types';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import { mock } from '@/src/components/mainContent/mock';
import Image from 'next/image';

const AddPlaceModal = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const filteredData: MockDataItem[] = useFilteredData({ data: mock.data }, searchValue);
  const handleSearchInputChange = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  return (
    <div className="flex flex-col">
      <SearchBar
        searchValue={searchValue}
        onChange={handleSearchInputChange}
        setSearchValue={setSearchValue}
        className="w-full mb-10"
      />
      <div className="flex flex-col gap-30 ">
        <div className="flex flex-col gap-10 overflow-y-auto h-230">
          {filteredData.map((item) => (
            <div key={item.cardId} className="flex items-center gap-10">
              <div className="w-87 h-87 relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-m"
                />
              </div>

              <p className="font-bold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPlaceModal;
