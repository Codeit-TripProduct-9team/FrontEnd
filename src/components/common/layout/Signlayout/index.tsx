import { PropsWithChildren } from 'react';

import Image from 'next/image';

import SignStar from '@/public/assets/icon/sign-star.svg';
import UtipLogo from '@/public/assets/icon/utip-logo.png';

const SignLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="relative flex justify-center items-center max-w-1440 min-h-screen mx-auto gap-16 ">
      <Image className="absolute top-15 left-120" src={UtipLogo} width={78} height={39} alt="logo" />
      {children}
      <div className="flex justify-center items-center w-810 h-screen bg-[url('/assets/icon/sign-image.png')] bg-cover">
        <div className="flex flex-col justify-center items-center text-center w-572  border-2 border-white bg-white bg-opacity-60 rounded-19">
          <h1 className="font-bold pt-20 text-24 text-blue ">유튜버의 여행지를 그대로!</h1>
          <Image src={SignStar} width={150} height={30} alt="star" />
          <p className=" w-347 mt-36 mb-16 mx-112">
            들어갈 문구가 필요해요 리뷰 쓴것같은 문구가 필요해요. 들어갈 문구가 필요해요 리뷰 쓴것같은 문구가 필요해요.
            들어갈 문구가 필요해요 리뷰 쓴것같은 문구가 필요해요.
          </p>
          <div className="text-12 mb-24">작성자</div>
        </div>
      </div>
    </main>
  );
};

export default SignLayout;
