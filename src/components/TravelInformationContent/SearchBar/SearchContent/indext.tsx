import Image from 'next/image';

import { MockDataItem } from '@/src/lib/types';

interface SearchContentProps {
  searchResult: MockDataItem[];
  onClick: (cardId: number) => void;
}

const SearchContent = ({ searchResult, onClick }: SearchContentProps) => {
  return (
    <ul className="absolute flex flex-col  left-150 top-67 py-20  w-625 h-290 bg-gray-20  overflow-y-scroll">
      {searchResult.map(({ cardId, title, thumbnail, tag }) => (
        <li
          key={cardId}
          className="flex w-full gap-24 px-24 py-12 text-18 text-gray-50 cursor-pointer  hover:bg-gray-30"
          onClick={() => onClick(cardId)}
        >
          <div className="flex items-center h-87 w-87 overflow-hidden rounded-10">
            <Image className="object-cover h-87" src={thumbnail} alt="img" width={87} height={87} />
          </div>
          <div className="flex flex-col justify-between">
            <div className="font-bold text-gray-80">{title}</div>
            <div className="text-12 txet-gray-60">충남 예산 시장</div>
            <div className="flex gap-8 pt-8">
              {tag.map((item, index) => (
                <div className="py-4 px-10 text-black text-12 font-semibold bg-gray-20 rounded-5" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchContent;
