import thumbnails from '/public/assets/icon/carousel1.png';
import Image from 'next/image';
import SearchInformation from './SearchInformation';

import { videoListProps } from '@/src/lib/types';

interface SearchContentProps {
  searchResult: videoListProps[];
  onClick: (cardId: number) => void;
}

const SearchContent = ({ searchResult, onClick }: SearchContentProps) => {
  return (
    <ul className="absolute flex flex-col left-120 top-65 py-20  w-625 h-290 bg-gray-20 border-2 border-gray-50  overflow-y-scroll">
      {searchResult.map(({ id, title, tag }) => (
        <li
          key={id}
          className="flex w-full gap-24 px-24 py-12 text-18 text-gray-50 cursor-pointer  hover:bg-gray-30"
          onClick={() => onClick(id)}
        >
          <div className="flex items-center h-87 w-87 overflow-hidden rounded-10">
            <Image className="object-cover h-87 " src={thumbnails} alt="img" width={87} height={87} />
          </div>
          <SearchInformation title={title} tag={tag} />
        </li>
      ))}
    </ul>
  );
};

export default SearchContent;
