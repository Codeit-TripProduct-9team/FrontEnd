import { createPortal } from 'react-dom';

function Potal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.getElementById('modal') as HTMLElement);
}

export default Potal;
