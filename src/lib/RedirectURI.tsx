import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RedirectURI = () => {
  const router = useRouter();

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
  });

  return (
    <div>
      <h1>로그인중</h1>
    </div>
  );
};

export default RedirectURI;
