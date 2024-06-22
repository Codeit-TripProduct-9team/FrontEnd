import Button from '@/src/components/common/button';

interface LoginModalProps {
  handleRouteLogin: () => void;
}

const LoginModal = ({ handleRouteLogin }: LoginModalProps) => {
  return (
    <div className="flex flex-col items-center gap-20 text-center pb-30">
      <span className="text-45">😥</span>
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-24">로그인 후 리뷰 작성이 가능합니다</h1>
        <div className="flex justify-center items-center gap-20 w-400 mt-20">
          <Button onClick={handleRouteLogin}>로그인</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
