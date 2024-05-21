import { FieldError, UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface InputForm {
  text?: string;
  email?: string;
  password?: string;
  passwordcheck?: string;
  nickname?: string;
  username?: string;
  file?: string;
}
interface InputProps {
  inputName: string;
  inputContent?: string;
  labelId: string;
  labelText?: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  clearError?: UseFormClearErrors<InputForm>;
  divCheckStyle?: string;
  inputCheckStyle?: string;
  inputErrorFixStyle?: string;
  focusType?: string;
  children?: React.ReactNode;
  defaultValue?: string;
  value?: string;
}

const Input = ({
  register,
  inputName,
  inputContent,
  labelId,
  labelText,
  type,
  error,
  clearError,
  focusType,
  divCheckStyle,
  inputCheckStyle,
  inputErrorFixStyle,
  defaultValue,
  value,
}: InputProps) => {
  const divStyle = twMerge(`flex flex-col items-start py-8 text-gray-9f text-16`, divCheckStyle);
  const inputStyle = twMerge(
    'w-full h-50 py-15 px-16 border-1 rounded-lg border-gray-9f text-black-33 focus:outline-none  focus:border-violet',
    inputCheckStyle,
  );
  const inputErrorStyle = twMerge(
    `w-full h-50 py-15 px-16 border-1 rounded-lg border-red text-black-33`,
    inputErrorFixStyle,
  );
  return (
    <div className={divStyle}>
      <label htmlFor={labelId}>{labelText}</label>
      <input
        {...register}
        type={type}
        name={inputName}
        className={error?.message ? inputErrorStyle : inputStyle}
        placeholder={inputContent}
        id={labelId}
        value={value}
        defaultValue={defaultValue}
        onFocus={() => {
          switch (focusType) {
            case 'text':
              return clearError ? clearError('text') : '';
            case 'email':
              return clearError ? clearError('email') : '';
            case 'password':
              return clearError ? clearError('password') : '';
            case 'nickname':
              return clearError ? clearError('nickname') : '';
            case 'username':
              return clearError ? clearError('username') : '';
            default:
              return clearError ? clearError('text') : '';
          }
        }}
      />

      {error?.message && <div className="text-red text-14 mt-5">{error.message}</div>}
    </div>
  );
};

export default Input;
