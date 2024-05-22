import Link from 'next/link';
import useClickOutside from '@/src/hooks/useClickOutside';

const Dropdown = ({ setDropDown }: { setDropDown: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useClickOutside(() => {
    setDropDown(false);
  });

  return (
    <nav
      ref={ref}
      className="absolute top-40 -right-15 mobile:-left-29 mobile:top-45 w-100 bg-white divide-y divide-gray-d9 rounded-lg shadow  dark:bg-black-4b dark:divide-gray-78 "
    >
      <ul className="py-2 text-16 text-black-4b dark:text-gray-200">
        <li>
          <Link
            href="/my-page"
            className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
          >
            마이페이지
          </Link>
        </li>
        <li>
          <Link
            href="/my-route"
            className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
          >
            나의 코스
          </Link>
        </li>
        <li>
          <Link
            href="/logout"
            className="block px-10 py-2 hover:bg-gray-d9 dark:hover:bg-gray-78 dark:hover:text-white"
          >
            로그아웃
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Dropdown;
