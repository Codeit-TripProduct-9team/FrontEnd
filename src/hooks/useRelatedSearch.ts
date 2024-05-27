import { relatedList } from '@/src/components/mainContent/relatedList';
import { decomposedSearchValue } from '@/src/utils/decomposedSearchValue';

export const useRelatedSearch = (searchValue: string, sectionVisible: boolean) => {
  const searchValueDecomposed = decomposedSearchValue(searchValue);

  const relatedData = {
    place: relatedList.place.filter((item) => decomposedSearchValue(item).includes(searchValueDecomposed)),
    youtuber: relatedList.youtuber.filter((item) => decomposedSearchValue(item).includes(searchValueDecomposed)),
    tag: relatedList.tag.filter((item) => decomposedSearchValue(item).includes(searchValueDecomposed)),
  };

  const combinedData = [...relatedData.place, ...relatedData.youtuber, ...relatedData.tag].slice(0, 7);

  const visible = searchValue.trim() !== '' && combinedData.length > 0 && sectionVisible;

  return { relatedData: combinedData, visible };
};
