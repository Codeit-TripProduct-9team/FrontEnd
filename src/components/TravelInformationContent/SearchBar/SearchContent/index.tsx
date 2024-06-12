import Image from 'next/image';

import SearchInformation from './SearchInformation';

import { videoListProps } from '@/src/lib/types';
import InformationSearchSkeleton from '@/src/components/common/skeleton/InformationSearchSkeleton';
import useSearchThumbnail from '@/src/hooks/useSearchthumbnail';

interface SearchContentProps {
  searchResult: videoListProps[];
  onClick: (cardId: number) => void;
}

const SearchContent = ({ searchResult, onClick }: SearchContentProps) => {
  const thumbnails = useSearchThumbnail(searchResult);

  return (
    <ul className="absolute flex flex-col left-120 top-65 pt-20  w-625 h-280 bg-gray-20 border-2 border-gray-50 overflow-y-scroll">
      {searchResult.map(({ id, title, tag }) => (
        <li
          key={id}
          className="flex w-full gap-24 px-24 py-12 text-18 text-gray-50 cursor-pointer hover:bg-gray-30"
          onClick={() => onClick(id)}
        >
          {thumbnails[id] ? (
            <>
              <Image
                className="object-cover h-87 rounded-m overflow-hidden"
                src={thumbnails[id]}
                alt="img"
                width={87}
                height={87}
              />
              <SearchInformation title={title} tag={tag} />
            </>
          ) : (
            <InformationSearchSkeleton />
          )}
        </li>
      ))}
    </ul>
  );
};

export default SearchContent;
