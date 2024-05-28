interface SortToolbarProps {
  sortByNewest: () => void;
  sortByLikes: () => void;
  sortByScore: () => void;
}

const SortToolbar = ({ sortByNewest, sortByLikes, sortByScore }: SortToolbarProps) => {
  return (
    <div className="flex flex-col gap-30">
      <div>정렬</div>
      <div className="flex gap-30">
        <button onClick={sortByNewest}>최신</button>
        <button onClick={sortByLikes}>좋아요</button>
        <button onClick={sortByScore}>별점</button>
      </div>
    </div>
  );
};

export default SortToolbar;
