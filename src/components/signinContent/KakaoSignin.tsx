import Button from '../common/button';
import Image from 'next/image';
import kakao from '@/public/assets/icon/kakao.svg';

const KakaoSignin = () => {
  return (
    <Button className="flex justify-center items-center" type="submit" bgColor="yellow" textColor="black">
      <Image src={kakao} alt="kakao signin" width={24} height={24} className="relative right-10" />
      카카오 계정으로 로그인
    </Button>
  );
};

export default KakaoSignin;
