import { FieldError, useForm } from 'react-hook-form';
import PasswordInput from '../../common/input/passwordInput';
import PasswordCheckInput from '../../common/input/passwordInput';
import { ERROR_MESSAGE } from '../../signupContent/constats';
import { REGEX } from '@/src/utils/regex';
import Button from '../../common/button';

type ChangePwForm = {
  email: string;
  password: string;
  newpassword?: string;
  passwordcheck?: string;
};

const ChangePwContent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    getValues,
  } = useForm<ChangePwForm>({ mode: 'onBlur', reValidateMode: 'onBlur' });
  const isValid = Object.keys(errors).length !== 0;

  const handleChangePassword = () => {
    //async
  };
  return (
    <section className=" flex flex-col w-408">
      <h1 className="text-24 font-bold ">비밀번호 변경</h1>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <PasswordInput
          register={register('password', {
            required: {
              value: true,
              message: ERROR_MESSAGE.EMPTY_PASSWORD,
            },
            pattern: {
              value: REGEX.PASSWORD,
              message: ERROR_MESSAGE.INVALID_PASSWORD_FORMAT,
            },
          })}
          type="password"
          clearError={clearErrors}
          error={errors.password as FieldError}
          inputName="password"
          inputContent="비밀번호"
          labelId="password"
          focusType="password"
        />
        <PasswordCheckInput
          register={register('passwordcheck', {
            required: {
              value: true,
              message: ERROR_MESSAGE.EMPTY_PASSWORD,
            },
            validate: (value) => value === getValues('password') || ERROR_MESSAGE.PASSWORDS_DO_NOT_MATCH,
          })}
          type="password"
          clearError={clearErrors}
          error={errors.passwordcheck as FieldError}
          inputName="passwordcheck"
          inputContent="비밀번호 확인"
          labelId="passwordcheck"
          focusType="passwordcheck"
        />
        <Button className="w-full mt-20" disabled={isValid}>
          변경하기
        </Button>
      </form>
    </section>
  );
};

export default ChangePwContent;
