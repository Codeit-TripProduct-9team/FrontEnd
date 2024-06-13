import { useEffect, useState } from 'react';

const useHandleScorll = (targetId: string) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScorll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollVisible = () => {
    const position = window.scrollY > window.innerHeight * 0.1;
    if (position) {
      setIsVisible(true);
    }
    if (!position) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollVisible);
    return () => {
      window.removeEventListener('scroll', scrollVisible);
    };
  }, []);
  return { handleScorll, isVisible };
};

export default useHandleScorll;
