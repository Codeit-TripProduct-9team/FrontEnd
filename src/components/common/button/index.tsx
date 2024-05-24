import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  bgColor?: BgColor;
  textColor?: TextColor;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

type BgColor = 'blue' | 'white' | 'yellow' | 'green';

type TextColor = 'white' | 'black' | 'blue' | 'gray';

const defaultStyle = 'w-408 h-54 rounded-s text-18 mobile:w-351';
const bgColorClasses: Record<BgColor, string> = {
  blue: 'bg-blue disabled:bg-gray-9f',
  white: 'bg-white border-1 border-gray-d9',
  yellow: 'bg-yellow',
  green: 'bg-green-naver',
};

const textColorClasses: Record<TextColor, string> = {
  white: 'text-white',
  black: 'text-black-33',
  blue: 'text-blue',
  gray: 'text-gray-78',
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  bgColor,
  textColor,
  disabled,
  onClick,
  className,
}) => {
  const buttonClass = twMerge(defaultStyle, className);
  const bgColorClass = bgColor ? bgColorClasses[bgColor] : '';
  const textColorClass = textColor ? textColorClasses[textColor] : '';

  return (
    <button
      className={`${buttonClass} ${bgColorClass} ${textColorClass}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
