import { useEffect, useState } from 'react';

import Image from 'next/image';

import ArrowUp from '@/public/assets/icon/arrow-up.svg';

interface ScrollButtonProps {
  targetId: string;
}

const ScrollButton = ({ targetId }: ScrollButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScorllToTop = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollVisiblePosition = () => {
    const visiblePosition = window.scrollY > window.innerHeight * 0.1;
    if (visiblePosition) {
      setIsVisible(true);
    }
    if (!visiblePosition) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollVisiblePosition);
    return () => {
      window.removeEventListener('scroll', scrollVisiblePosition);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-50 right-40 flex justify-center items-center bg-blue w-50 h-50 border border-white rounded-m ">
          <button onClick={handleScorllToTop} className="p-3  transition duration-300">
            <Image src={ArrowUp} alt="up" width={30} height={30} />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollButton;
