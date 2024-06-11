const CATEGORY = ['음식점', '숙박', '관광명소'];

type CategoryButtonProps = {
  selectedQuery: string;
  setSelectedQuery: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryButton = ({ selectedQuery, setSelectedQuery }: CategoryButtonProps) => {
  return (
    <div className="absolute bg-gray-30 text-white rounded-s border-1 flex flex-col text-center shadow-main overflow-hidden">
      {CATEGORY.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedQuery(category)}
          className={`border-b-1 last:border-none cursor-pointer p-4 ${selectedQuery === category && 'bg-blue'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButton;
