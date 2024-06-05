import SearchBar from '@/src/components/MyRouteContent/SearchBar';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { MockDataItem } from '@/src/lib/types';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import { mock } from '@/src/components/mainContent/mock';
import ModalPlaceList from './ModalPlaceList';

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
      <ModalPlaceList data={filteredData} />
    </div>
  );
};

export default AddPlaceModal;
