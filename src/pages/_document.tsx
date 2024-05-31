import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <body>
        <Main />
        <div id="modal" />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_ID_KAKAO}&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
