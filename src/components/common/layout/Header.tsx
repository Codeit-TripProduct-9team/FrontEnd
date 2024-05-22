import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/icon/logo-header.png';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Dropdown from './Dropdown';

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const handleDropdown = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <header className="flex justify-between p-16 mobile:px-24 bg-gray-100">
      <Link href="/" className="">
        <Image src={logo} alt="홈으로 가기" width={30} height={30} className="rounded-99" />
      </Link>
      <nav className="flex items-center gap-36 mobile:gap-20 mobile:text-14">
        <Link href="/signin" className="">
          로그인
        </Link>
        <Link href="/singup" className="">
          회원가입
        </Link>

        <div className="flex items-center gap-10 relative">
          <div onClick={handleDropdown} className="cursor-pointer">
            {!dropDown ? (
              <ChevronDownIcon className="w-20 h-20 text-gray-78" />
            ) : (
              <ChevronUpIcon className="w-20 h-20 text-gray-78" />
            )}

            {dropDown && <Dropdown setDropDown={setDropDown} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
