import { useEffect, useState } from 'react';

import Image from 'next/image';

import SearchInformation from './SearchInformation';

import InformationSearchSkeleton from '@/src/components/common/skeleton/InformationSearchSkeleton';
import { BASED_URL } from '@/src/constants/constants';
import { videoListProps } from '@/src/lib/types';
import instance from '@/src/api/axios';

interface SearchContentProps {
  searchResult: videoListProps[];
  onClick: (videoId: number) => void;
}

const SearchContent = ({ searchResult, onClick }: SearchContentProps) => {
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const [thumbnailsLoading, setThumbnailsLoading] = useState<boolean>(false);

  const getYoutubeData = async (videoId: string) => {
    try {
      const part = 'snippet,statistics';
      const response = await instance.get(
        `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${part}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setThumbnailsLoading(false);
    }
  };

  useEffect(() => {
    const getSearchBarThumbnails = async () => {
      const searchBarThumbnails: { [key: string]: string } = {};
      for (const { id, videoUrl } of searchResult) {
        const videoId = videoUrl.split('v=')[1];
        const youtubeData = await getYoutubeData(videoId);
        const hasYoutubeData = youtubeData.items.length > 0;
        if (hasYoutubeData) {
          const thumbnail = youtubeData.items[0].snippet.thumbnails?.high?.url;
          searchBarThumbnails[id] = thumbnail;
        }
      }
      setThumbnails(searchBarThumbnails);
    };

    getSearchBarThumbnails();
  }, [searchResult]);

  return (
    <ul className="absolute flex flex-col left-120 top-65 w-625 h-280 bg-gray-20 border-2 border-gray-50 overflow-y-scroll">
      {searchResult.map(({ id, title, tag }) => (
        <li
          key={id}
          className="flex w-full gap-24 px-24 py-12 text-18 text-gray-50 cursor-pointer border border-b-1 hover:bg-gray-30"
          onClick={() => onClick(id)}
        >
          {thumbnailsLoading || thumbnails[id] ? (
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
