import Image from 'next/image';
import { useEffect, useState } from 'react';
import SearchInformation from './SearchInformation';

import { videoListProps } from '@/src/lib/types';
import getYoutubeData from '@/src/api/getYoutubeData';
import InformationSearchSkeleton from '@/src/components/common/skeleton/InformationSearchSkeleton';

interface SearchContentProps {
  searchResult: videoListProps[];
  onClick: (cardId: number) => void;
}

const SearchContent = ({ searchResult, onClick }: SearchContentProps) => {
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      const thumbnailsData: { [key: string]: string } = {};
      for (const { id, url } of searchResult) {
        const videoId = url.split('v=')[1];
        const data = await getYoutubeData(videoId);
        const thumbnail = data?.items[0]?.snippet?.thumbnails?.high?.url;
        if (thumbnail) {
          thumbnailsData[id] = thumbnail;
        }
      }
      setThumbnails(thumbnailsData);
    };

    fetchThumbnails();
  }, [searchResult]);

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
