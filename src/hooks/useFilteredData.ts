import { CardDataItem } from '../lib/types';
import { decomposedSearchValue } from '../utils/decomposedSearchValue';

interface FilteredDataProps {
  data: CardDataItem[];
}

export const useFilteredData = ({ data }: FilteredDataProps, searchValue: string): CardDataItem[] => {
  if (Array.isArray(data)) {
    const filteredValues = decomposedSearchValue(searchValue).split(' ');
    return data?.filter((item) => {
      const decomposedTitle = decomposedSearchValue(item.title);
      const decomposedDescription = decomposedSearchValue(item.content);

      const decomposedTag = item.tags.map((t: string) => decomposedSearchValue(t));
      return filteredValues.every(
        (filteredValue) =>
          decomposedTitle.includes(filteredValue) ||
          decomposedDescription.includes(filteredValue) ||
          decomposedTag.some((tag: string) => tag.includes(filteredValue)),
      );
    });
  }
};
