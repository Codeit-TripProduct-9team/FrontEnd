import { FieldError, useForm } from 'react-hook-form';
import PasswordInput from '../../common/input/passwordInput';

type ChangePwForm = {
  text?: string;
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck?: string;
  checkbox?: boolean;
  file?: string;
  nickname?: string;
};

const ChangePwContent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    // setError,
  } = useForm<ChangePwForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });

  const handleChangePassword = () => {
    //async
  };
  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <PasswordInput
        register={register('password', {
          required: {
            value: true,
            message: '비밀번호를 입력해주세요.',
          },
        })}
        type="password"
        clearError={clearErrors}
        error={errors.password as FieldError}
        inputName="password"
        inputContent="비밀번호"
        labelId="password"
      />
      <PasswordInput
        register={register('password', {
          required: {
            value: true,
            message: '비밀번호를 다시 입력해주세요.',
          },
        })}
        type="password"
        clearError={clearErrors}
        error={errors.password as FieldError}
        inputName="checkPassword"
        inputContent="비밀번호"
        labelId="checkPassword"
      />
    </form>
  );
};

export default ChangePwContent;
