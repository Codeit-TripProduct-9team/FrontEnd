import SearchBar from '@/src/components/MyRouteContent/SearchBar';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { MyPlace } from '@/src/lib/types';
import combineVideoPlace from '@/src/api/combineVideoPlace';
import { CardDataItem } from '@/src/lib/types';
import { useFilteredData } from '@/src/hooks/useFilteredData';
import ModalPlaceList from '../AddNearbyPlaceModal.tsx/ModalPlaceList';
import truncateText from '@/src/utils/truncateText';

const AddPlaceModal = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [placeData, setPlaceData] = useState<MyPlace[]>([]);
  const MAXIMUM_DESCRIPTION_LENGTH = 100;

  useEffect(() => {
    const fetchData = async () => {
      await combineVideoPlace().then((data) => setPlaceData(data));
    };
    fetchData();
  }, []);

  const filteredData: CardDataItem[] = useFilteredData({ data: placeData }, searchValue);

  const modifiedData = filteredData.map((item) => ({
    id: item.id,
    mainImg: item.img,
    name: item.name,
    description: truncateText(item.description, MAXIMUM_DESCRIPTION_LENGTH),
  }));

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
      <ModalPlaceList data={modifiedData} />
    </div>
  );
};

export default AddPlaceModal;
