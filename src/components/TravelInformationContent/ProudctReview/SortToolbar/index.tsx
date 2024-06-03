interface SortToolbarProps {
  sortByNewest: () => void;
  sortByScore: () => void;
}

const SortToolbar = ({ sortByNewest, sortByScore }: SortToolbarProps) => {
  return (
    <div className="flex flex-col gap-30">
      <div className="flex gap-30">
        <button onClick={sortByNewest}>최신</button>
        <button onClick={sortByScore}>별점</button>
      </div>
    </div>
  );
};

export default SortToolbar;
