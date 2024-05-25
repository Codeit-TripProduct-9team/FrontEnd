import { PropsWithChildren } from 'react';

import Image from 'next/image';

import SignStar from '@/public/assets/icon/star.svg';
import UtripLogo from '@/public/assets/icon/utrip-logo.png';

const SignLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative flex justify-center items-center max-w-1440 min-h-screen mx-auto gap-16 ">
      <Image className="absolute top-15 left-120" src={UtripLogo} width={78} height={39} alt="logo" />

      <div className="w-1/2 flex justify-center items-center">{children}</div>
      <div className="flex justify-center items-center w-1/2 h-screen bg-[url('/assets/icon/sign-image.png')] bg-cover">
        <div className="flex flex-col justify-center items-center text-center w-572  border-2 border-white bg-white bg-opacity-60 rounded-19">
          <h1 className="font-bold pt-20 text-24 text-blue ">유튜버의 여행지를 그대로!</h1>
          <div className="flex gap-5">
            {[...Array(5)].map((_, i) => (
              <Image key={i} src={SignStar} width={30} height={30} alt="star" />
            ))}{' '}
          </div>
          <p className="w-347 mt-36 mb-16 mx-112 text-left">
            유튜브에서 본 멋진 여행지들을 직접 경험할 수 있어서 너무 좋았어요. 이 웹사이트는 단순히 여행지만 알려주는
            것이 아니라, 구체적인 일정과 추천 장소까지 제공해줘서 여행 준비가 훨씬 쉬워졌어요.{' '}
          </p>
          <div className="text-12 mb-24">김OO - 20대 대학생, 유튜브 팬</div>
        </div>
      </div>
    </main>
  );
};

export default SignLayout;
