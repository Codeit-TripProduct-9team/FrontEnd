import Button from '../common/button';
import Image from 'next/image';
import kakao from '@/public/assets/icon/kakao.svg';
import KakaoAuth from '@/src/lib/KakaoAuth';

const KakaoSignin = () => {
  return (
    <Button className="font-semibold" rounded={4} bgColor="yellow" textColor="black" onClick={KakaoAuth}>
      <Image src={kakao} alt="kakao signin" width={16} height={16} className="relative right-10" />
      카카오로 간편 로그인
    </Button>
  );
};

export default KakaoSignin;
