const CATEGORY = ['음식점', '숙박', '관광명소'];

type CategoryListProps = {
  selectedQuery: string;
  setSelectedQuery: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryList = ({ selectedQuery, setSelectedQuery }: CategoryListProps) => {
  return (
    <ul className="absolute bg-white rounded-s border-1 flex flex-col text-center shadow-main overflow-hidden">
      {CATEGORY.map((category) => (
        <li
          key={category}
          onClick={() => setSelectedQuery(category)}
          className={`border-b-1 last:border-none cursor-pointer p-4 ${
            selectedQuery === category && 'bg-blue text-white'
          }`}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
