interface CombineStyleProps {
  isSelected: boolean;
  base: string;
  selected: string;
  notSelected: string;
}

const combineStyle = ({ isSelected, base, selected, notSelected }: CombineStyleProps): string => {
  return `${base} ${isSelected ? selected : notSelected}`;
};

export default combineStyle;
