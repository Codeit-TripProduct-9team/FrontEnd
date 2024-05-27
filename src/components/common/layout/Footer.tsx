import Image from 'next/image';
// import email from '@/public/assets/icon/email.svg';
// import facebook from '@/public/assets/icon/facebook.svg';
// import instagram from '@/public/assets/icon/instagram.svg';
import Link from 'next/link';
import logo from '@/public/assets/icon/logo-footer.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-80 text-white flex flex-col w-full px-140 h-200 py-40 gap-30">
      <div className="flex flex-col gap-10">
        <Image src={logo} alt="logo" width={54} height={30} />
        <p className="text-12">
          유튜버로 보는 여행 기록 서비스, Utrip <br />
          <Link href="/privacy">개인정보처리방침</Link> | <Link href="/service">서비스 이용약관</Link>
        </p>
      </div>
      <div>
        <p className="text-8 text-gray-50">
          ⓒ 2024 Utrip. All rights reserved
          <br /> Contact
        </p>
      </div>
    </footer>
  );
};

export default Footer;
