import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/icon/logo-header.svg';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Dropdown from './Dropdown';
import { getCookie } from '@/src/utils/cookie';
import { useEffect } from 'react';

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const handleDropdown = () => {
    setDropDown((prev) => !prev);
  };

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken === undefined) {
      setHasToken(false);
    } else {
      setHasToken(true);
    }
  }, []);

  return (
    <header className="flex justify-between items-center py-16 px-120 bg-gray-10">
      <Link href="/" className="">
        <Image src={logo} alt="홈으로 가기" width={78} height={39} />
      </Link>
      <nav className="flex items-center gap-16">
        {hasToken ? (
          <Link href="/my-page" className="px-16 py-6 bg-gray-70 text-white rounded-s">
            마이페이지
          </Link>
        ) : (
          <Link href="/signin" className="px-16 py-6 bg-gray-70 text-white rounded-s">
            로그인
          </Link>
        )}
        {hasToken && (
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
        )}
      </nav>
    </header>
  );
};

export default Header;
