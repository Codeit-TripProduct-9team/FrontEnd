import useClickOutside from '@/src/hooks/useClickOutside';
import Potal from './Portal';
import { twMerge } from 'tailwind-merge';
import cross from '@/public/assets/icon/cross.svg';
import Image from 'next/image';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, close, children, className }: ModalProps) => {
  const modalClass = twMerge(
    'flex flex-col fixed top-1/2 left-1/2 bg-white shadow-main rounded-l zIndex-modal transform -translate-x-1/2 -translate-y-1/2 px-28 py-32 mobile:px-20 mobile:py-28 w-540 mobile:w-327',
    className,
  );
  const modalRef = useClickOutside(close);
  return (
    <>
      {isOpen && (
        <Potal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div ref={modalRef} className={`${modalClass}`}>
              <Image
                src={cross}
                alt="close"
                width={13}
                height={13}
                className="absolute right-24 top-24 cursor-pointer"
                onClick={close}
              />
              {children}
            </div>
          </div>
        </Potal>
      )}
    </>
  );
};

export default Modal;
