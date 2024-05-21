import Button from '../common/button';
import Image from 'next/image';
import naver from '@/public/assets/icon/naver.svg';
import NaverApi from '@/src/lib/NaverApi';

const NaverSignin = () => {
  return (
    <Button
      onClick={NaverApi}
      className="flex justify-center items-center"
      type="submit"
      bgColor="green"
      textColor="white"
    >
      <Image src={naver} alt="kakao signin" width={24} height={24} className="relative right-10" />
      네이버 계정으로 로그인
    </Button>
  );
};

export default NaverSignin;
