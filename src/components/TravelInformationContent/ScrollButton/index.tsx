import Image from 'next/image';

import ArrowUp from '@/public/assets/icon/arrow-up.svg';

interface ScrollButtonProps {
  targetId: string;
}

const ScrollButton = ({ targetId }: ScrollButtonProps) => {
  const element = document.getElementById(targetId);

  return (
    <span className="fixed bottom-50 right-40 flex justify-center items-center bg-blue w-50 h-50 border border-white rounded-m ">
      <button
        onClick={() => element && element.scrollIntoView({ behavior: 'smooth' })}
        className="p-3  transition duration-300"
      >
        <Image src={ArrowUp} alt="up" width={30} height={30} />
      </button>
    </span>
  );
};

export default ScrollButton;
