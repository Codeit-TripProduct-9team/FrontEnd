import { ReactNode, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type CustomStyle = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  textColor?: string;
  className?: string;
};

type CustomButtonProps = CustomStyle & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<CustomButtonProps> = ({
  children,
  disabled,
  onClick,
  textColor = '',
  className = '',
  ...props
}) => {
  const buttonStyle = twMerge('w-408 h-54 text-18 flex justify-center items-center bg-blue rounded-10', className);
  const textColorStyle = textColor ? `text-${textColor}` : 'text-white';

  return (
    <button className={`${buttonStyle} ${textColorStyle}`} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
