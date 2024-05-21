// components/InputField.tsx

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  error?: FieldError;
  placeholder?: string;
  onEnter?: () => void;
  labelStyle?: string;
  inputStyle?: string;
};

const InputField = ({
  label,
  type,
  name,
  placeholder,
  register,
  required = false,
  pattern,
  error,
  onEnter,
  labelStyle,
  inputStyle,
}: InputFieldProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnter) {
      event.preventDefault();
      onEnter();
    }
  };
  return (
    <div>
      <p className={labelStyle}>{label}</p>
      <input
        className={inputStyle}
        type={type}
        placeholder={placeholder}
        {...register(name, { required, pattern })}
        onKeyDown={handleKeyDown}
      />
      {error && <p className="text-red">{error.message}</p>}
    </div>
  );
};

export default InputField;
