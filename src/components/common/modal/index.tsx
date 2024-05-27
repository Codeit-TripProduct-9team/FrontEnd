import Potal from './Portal';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
  return <>{isOpen && <Potal>{children}</Potal>}</>;
};

export default Modal;
