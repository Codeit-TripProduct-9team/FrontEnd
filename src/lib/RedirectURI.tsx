import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RedirectURI = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);
    // const deliverCode = async (code: string) => {
    //   try {
    //     const response = await fetch('백엔드주소', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ code }),
    //     });
    //     return response.status !== 409;
    //   } catch (error) {}
    // };

    setTimeout(() => router.push('/signin'), 3000);
  });

  return (
    <div>
      <h1>로그인중</h1>
    </div>
  );
};

export default RedirectURI;
