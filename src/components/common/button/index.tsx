import { ReactNode, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type CustomStyle = {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  rounded?: number | string;
  onClick?: () => void;
  className?: string;
};

type CustomButtonProps = CustomStyle & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<CustomButtonProps> = ({
  children,
  bgColor,
  textColor,
  rounded,
  disabled,
  onClick,
  className,
  ...props
}) => {
  //twMerge에서 dynamic classNames을 지원 안하기 때문에 이런식으로 작성했음
  const defaultStyle = 'w-408 h-54 text-18 flex justify-center items-center ';
  const buttonClass = twMerge(`${defaultStyle} ${className}`);
  const bgColorClass = bgColor ? `bg-${bgColor}` : 'bg-blue';
  const textColorClass = textColor ? `text-${textColor}` : 'text-white';
  const roundedClass = rounded ? `rounded-${rounded}` : 'rounded-s';
  return (
    <button
      className={`${bgColorClass} ${textColorClass} ${roundedClass} ${buttonClass}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
