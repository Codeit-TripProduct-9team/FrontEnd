import Image from 'next/image';

import { MockDataItem } from '@/src/lib/types';
import SearchInformation from './SearchInformation';

interface SearchContentProps {
  searchResult: MockDataItem[];
  onClick: (cardId: number) => void;
}

const SearchContent = ({ searchResult, onClick }: SearchContentProps) => {
  return (
    <ul className="absolute flex flex-col left-120 top-65 py-20  w-625 h-290 bg-gray-20 border-2 border-gray-50  overflow-y-scroll">
      {searchResult.map(({ cardId, title, thumbnail, tag }) => (
        <li
          key={cardId}
          className="flex w-full gap-24 px-24 py-12 text-18 text-gray-50 cursor-pointer  hover:bg-gray-30"
          onClick={() => onClick(cardId)}
        >
          <div className="flex items-center h-87 w-87 overflow-hidden rounded-10">
            <Image className="object-cover h-87" src={thumbnail} alt="img" width={87} height={87} />
          </div>
          <SearchInformation title={title} tag={tag} />
        </li>
      ))}
    </ul>
  );
};

export default SearchContent;
