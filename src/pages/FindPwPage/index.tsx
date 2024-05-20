import InputField from '@/src/components/common/input/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
};

const FindPwPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div>로고</div>
      <article>
        <h3>계정의 비밀번호를 재설정합니다.</h3>
        <p>비밀번호를 재설정하는 계정의 이메일을 입력해 주세요.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            type="email"
            name="email"
            register={register}
            required="Email is required"
            pattern={{
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            }}
            error={errors.email}
          />
          <button type="submit">Submit</button>
        </form>
      </article>
    </section>
  );
};

export default FindPwPage;
