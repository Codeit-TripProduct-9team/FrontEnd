import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import cross from '@/public/assets/icon/cross.svg';
import Image from 'next/image';

interface ModalProps {
  children: ReactNode;
  openModal: boolean;
  handleModalClose: () => void;
  className?: string;
  buttonClassName?: string;
}

const Modal: React.FC<ModalProps> = ({ children, openModal, handleModalClose, className }) => {
  const modalClass = twMerge(
    'flex flex-col fixed top-1/2 left-1/2 bg-white shadow-main rounded-l zIndex-modal transform -translate-x-1/2 -translate-y-1/2 px-28 py-32 mobile:px-20 mobile:py-28',
    className,
  );

  const open = 'block';

  const handleOverlayClick = () => {
    handleModalClose();
  };
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full bg-black-overlay zIndex" onClick={handleOverlayClick} />

      <div className={`${modalClass} ${openModal ? open : ''}`}>
        <Image
          src={cross}
          alt="close"
          width={13}
          height={13}
          className="absolute right-24 top-24 cursor-pointer"
          onClick={handleModalClose}
        />
        {children}
      </div>
    </>
  );
};

export default Modal;
