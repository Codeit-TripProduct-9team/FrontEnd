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
  };

  return (
    <nav ref={ref} className="absolute top-44 right-0 w-100 bg-white rounded-s shadow-main z-10">
      <ul className=" text-black">
        <DropdownItem href="/my-page">마이페이지</DropdownItem>
        <DropdownItem href="/my-route">나의 코스</DropdownItem>
        <DropdownItem href="/signin" onClick={handleLogout}>
          로그아웃
        </DropdownItem>
      </ul>
    </nav>
  );
};

export default Dropdown;
