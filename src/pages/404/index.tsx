import { useRouter } from 'next/router';
import loginLogo from '@/public/assets/icon/loginLogo.png';
import Image from 'next/image';

const NoPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center flex-col gap-20">
        <div className="mb-20">
          <Image src={loginLogo} width={200} height={200} alt="로그인로고" />
        </div>
        <h1 className="text-30 text-center font-bold text-gray-60">존재하지 않는 페이지 입니다.</h1>
        <div className="flex mt-30 bg-blue text-20 items-center justify-center gap-10 cursor-pointer text-white p-10 rounded-s ">
          <div onClick={() => router.push('/')}>홈으로 가기</div>
        </div>
      </div>
    </div>
  );
};

export default NoPage;
