import InputField from '@/src/components/common/input/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  email: string;
};

const FindPwPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <div className="mb-20">로고</div>
      <article className="border-solid border-2 p-70 max-w-580 min-h-500 w-full">
        <div>
          <h3 className="text-5xl font-bold mb-20">비밀번호를 재설정합니다.</h3>
          <p className="mb-40 text-3xl">
            비밀번호를 재설정하는 <br />
            계정의 이메일을 입력해 주세요.
          </p>
          <form>
            <InputField
              label="이메일"
              type="email"
              name="email"
              placeholder="입력"
              register={register}
              required
              pattern={{
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: '이메일 형식이 올바르지 않습니다.',
              }}
              error={errors.email}
              onEnter={handleSubmit(onSubmit)}
              inputStyle="px-15 py-10 bg-gray-100 w-full text-3xl"
              labelStyle="font-semibold text-xl mb-5"
            />
          </form>
        </div>
        <button
          className={`mt-30 w-full  h-40 ${isValid ? 'bg-sky-200 hover:bg-sky-300' : 'bg-gray-200 hover:bg-gray-300'} `}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          다음
        </button>
      </article>
    </section>
  );
};

export default FindPwPage;
