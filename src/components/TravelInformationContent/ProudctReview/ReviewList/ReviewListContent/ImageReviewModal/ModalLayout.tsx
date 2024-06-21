import useClickOutside from '@/src/hooks/useClickOutside';
import Potal from '@/src/components/common/modal/Portal';
import { twMerge } from 'tailwind-merge';
import cross from '@/public/assets/icon/cross.svg';
import Image from 'next/image';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  noClose?: boolean;
  className?: string;
};

const ModalLayout = ({ isOpen, close, children, noClose, className }: ModalProps) => {
  const modalClass = twMerge(
    'flex flex-col fixed top-1/2 left-1/2 bg-white shadow-main rounded-l zIndex-modal transform -translate-x-1/2 -translate-y-1/2 px-28 py-32 w-900',
    className,
  );
  const modalRef = useClickOutside(close);
  return (
    <>
      {isOpen && (
        <Potal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div ref={modalRef} className={`${modalClass}`}>
              {!noClose && (
                <Image
                  src={cross}
                  alt="close"
                  width={13}
                  height={13}
                  className="absolute right-24 top-24 cursor-pointer"
                  onClick={close}
                />
              )}
              {children}
            </div>
          </div>
        </Potal>
      )}
    </>
  );
};

export default ModalLayout;
