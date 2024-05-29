interface RelatedSearchInfoProps {
  data: string[];
  setSectionVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const RelatedSearchInfo: React.FC<RelatedSearchInfoProps> = ({ data, setSectionVisible, setSearchValue }) => {
  const handleListClick = (value: string) => {
    setSectionVisible(false);
    setSearchValue(value);
  };
  return (
    <div className="flex flex-col gap-10 bg-gray-60 mt-20 bg-opacity-50 bg-transparent text-center w-700 border-2 rounded-30 p-10">
      {data.map((data, idx) => (
        <div
          key={idx}
          className="hover:bg-white hover:text-gray-60 bg-opacity-50 text-20 text-white rounded-30 cursor-pointer"
          onClick={() => handleListClick(data)}
        >
          {data}
        </div>
      ))}
    </div>
  );
};

export default RelatedSearchInfo;
