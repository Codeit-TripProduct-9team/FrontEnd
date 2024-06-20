import { MockDataItem } from '../lib/types';
import { decomposedSearchValue } from '../utils/decomposedSearchValue';

interface FilteredDataProps {
  data: MockDataItem[];
}

export const useFilteredData = ({ data }: FilteredDataProps, searchValue: string): MockDataItem[] => {
  if (Array.isArray(data)) {
    const filteredValues = decomposedSearchValue(searchValue).split(' ');
    return data?.filter((item) => {
      const decomposedTitle = decomposedSearchValue(item.title);
      const decomposedDescription = decomposedSearchValue(item.description);
      // const decomposedTag = JSON.parse(item.tag).map((t: string) => decomposedSearchValue(t));

      return filteredValues.every(
        (filteredValue) => decomposedTitle.includes(filteredValue) || decomposedDescription.includes(filteredValue),
        // ||
        // decomposedTag.some((tag: string) => tag.includes(filteredValue)),
      );
    });
  }
};
