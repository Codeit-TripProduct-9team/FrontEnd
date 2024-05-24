import Button from '../common/button';
import Image from 'next/image';
import naver from '@/public/assets/icon/naver.svg';
import NaverApi from '@/src/lib/NaverAuth';

const NaverSignin = () => {
  return (
    <Button onClick={NaverApi} rounded={4} bgColor="green-naver">
      <Image src={naver} alt="naver signin" width={16} height={16} className="relative right-10" />
      네이버로 간편 로그인
    </Button>
  );
};

export default NaverSignin;
