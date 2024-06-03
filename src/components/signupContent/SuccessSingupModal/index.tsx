import { MODAL_MESSAGE } from '@/src/constants/constants';

interface SignupModalProps {
  nickname: string;
}

const SuccessSignup: React.FC<SignupModalProps> = ({ nickname }) => {
  return (
    <div className="flex flex-col gap-20 text-center pb-30">
      <span className="text-45">🎉</span>
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">{MODAL_MESSAGE.SUCCESS_SIGNUP}</h1>
        <p className="text-gray-70">
          {`${nickname}의 회원가입을 환영합니다.`}
          <br />
          지금 바로 다양한 컨텐츠들을 둘러보세요!
        </p>
      </div>
    </div>
  );
};

export default SuccessSignup;
