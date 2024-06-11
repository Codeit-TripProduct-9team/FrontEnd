interface SearchInformationProps {
  title: string;
  tag: string;
}

const SearchInformation = ({ title, tag }: SearchInformationProps) => {
  return (
    <div className="flex flex-col justify-between w-450">
      <div className="font-bold text-gray-80 text-ellipsis">{title}</div>
      <div className="text-12 txet-gray-60">충남 예산 시장</div>
      <div className="flex gap-8 pt-8">
        {JSON.parse(tag).map((item: string, index: number) => (
          <div className="py-4 px-10 text-black text-12 font-semibold bg-gray-20 rounded-5" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchInformation;
