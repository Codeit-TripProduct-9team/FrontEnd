// components/InputField.tsx

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  error?: FieldError;
};

const InputField = ({ label, type, name, register, required, pattern, error }: InputFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name, { required, pattern })} />
      {error && <p className="text-red">{error.message}</p>}
    </div>
  );
};

export default InputField;
