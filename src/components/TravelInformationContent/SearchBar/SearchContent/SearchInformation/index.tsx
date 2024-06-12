import truncateText from '@/src/utils/truncateText';

interface SearchInformationProps {
  title: string;
  tag: string;
}

const SearchInformation = ({ title, tag }: SearchInformationProps) => {
  return (
    <div className="flex flex-col justify-between w-450">
      <h2 className="font-bold text-gray-80 text-ellipsis">{truncateText(title, 35)}</h2>
      <p className="text-12 txet-gray-60">충남 예산 시장</p>
      <div className="flex justify-between gap-8 pt-8">
        <ul className="flex  gap-8 pt-8">
          {JSON.parse(tag).map((item: string, index: number) => (
            <li className="py-4 px-10 text-black text-12 font-semibold bg-gray-20 rounded-5" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchInformation;
