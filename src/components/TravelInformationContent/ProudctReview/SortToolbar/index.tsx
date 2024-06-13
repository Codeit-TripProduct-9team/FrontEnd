import useSelectContent from '@/src/hooks/useSelectContent';
import combineStyle from '@/src/utils/combineStyle';

import { useEffect } from 'react';

const sortButtonStyle = {
  base: '',
  selected: 'border-b-black border-b-2 font-bold',
  notSelected: 'border-b-gray-200',
};
interface SortToolbarProps {
  sortType: string;
  setSortType: (type: string) => void;
}

const SortToolbar = ({ sortType, setSortType }: SortToolbarProps) => {
  const { content, handleSelectContent } = useSelectContent(sortType);

  useEffect(() => {
    setSortType(content);
  }, [content, setSortType]);

  return (
    <div className="flex flex-col gap-30 pt-30">
      <div className="flex gap-30">
        <button
          onClick={() => {
            handleSelectContent('latest');
          }}
          className={combineStyle({
            isSelected: content === 'latest',
            base: sortButtonStyle.base,
            selected: sortButtonStyle.selected,
            notSelected: sortButtonStyle.notSelected,
          })}
        >
          최신순
        </button>
        <button
          onClick={() => {
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
