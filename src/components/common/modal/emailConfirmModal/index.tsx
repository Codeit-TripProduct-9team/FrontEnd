import { useRouter } from 'next/router';
import { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  code: string;
};

const EmailConfirmModal = ({ isOpen, close, code }: ModalProps) => {
  const [inputCode, setInputCode] = useState(''); //리엑트 훅 폼으로 사용 변경 필요
  const router = useRouter();

  const handleConfirm = () => {
    if (inputCode === code) {
      alert('이메일 인증이 완료되었습니다.');
      close();
      router.push('/reset-password/change-password'); // 비밀번호 변경 페이지로 이동
    } else {
      alert('인증 코드가 일치하지 않습니다.');
    }
  };

  //스타일은 임시로 지피티의 도움^3^
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded">
            <h2 className="text-xl mb-4">인증 코드 입력</h2>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="border p-2 mb-4"
            />
            <div className="flex justify-end">
              <button onClick={handleConfirm} className="bg-blue-500 text-white p-2 rounded mr-2">
                확인
              </button>
              <button onClick={close} className="bg-gray-500 text-white p-2 rounded">
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailConfirmModal;
