import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
      </body>
    </Html>
  );
}
