import useSelectContent from '@/src/hooks/useSelectContent';
import combineStyle from '@/src/utils/combineStyle';

interface SortToolbarProps {
  sortByNewest: () => void;
  sortByScore: () => void;
}

const sortButtonStyle = {
  base: '',
  selected: 'border-b-black border-b-2 font-bold',
  notSelected: 'border-b-gray-200',
};

const SortToolbar = ({ sortByNewest, sortByScore }: SortToolbarProps) => {
  const { content, handleSelectContent } = useSelectContent('new');

  return (
    <div className="flex flex-col gap-30 pt-30">
      <div className="flex gap-30">
        <button
          onClick={() => {
            sortByNewest();
            handleSelectContent('new');
          }}
          className={combineStyle({
            isSelected: content === 'new',
            base: sortButtonStyle.base,
            selected: sortButtonStyle.selected,
            notSelected: sortButtonStyle.notSelected,
          })}
        >
          최신순
        </button>
        <button
          onClick={() => {
            sortByScore();
            handleSelectContent('score');
          }}
          className={combineStyle({
            isSelected: content === 'score',
            base: sortButtonStyle.base,
            selected: sortButtonStyle.selected,
            notSelected: sortButtonStyle.notSelected,
          })}
        >
          별점순
        </button>
      </div>
    </div>
  );
};

export default SortToolbar;
