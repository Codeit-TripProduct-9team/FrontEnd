import Link from 'next/link';
import useClickOutside from '@/src/hooks/useClickOutside';
import { removeCookie } from '@/src/utils/cookie';

type DropdownItemProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const DropdownItem = ({ href, children, onClick }: DropdownItemProps) => {
  return (
    <li onClick={onClick}>
      <Link href={href} className="block px-10 py-2 hover:bg-blue hover:text-white rounded-s">
        {children}
      </Link>
    </li>
  );
};

const Dropdown = ({ setDropDown }: { setDropDown: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useClickOutside(() => {
    setDropDown(false);
  });

  const handleLogout = () => {
    removeCookie('accessToken');
    removeCookie('userId');
    removeCookie('nickname');
    removeCookie('refreshToken');
  };

  return (
    <nav ref={ref} className="absolute top-35 right-0 w-100 bg-white rounded-s shadow-main z-10">
      <ul className=" text-black">
        <DropdownItem href="/course/new">코스 짜보기</DropdownItem>
        <DropdownItem href="/my-course">저장된 코스</DropdownItem>
        <DropdownItem href="/signin" onClick={handleLogout}>
          로그아웃
        </DropdownItem>
      </ul>
    </nav>
  );
};

export default Dropdown;
