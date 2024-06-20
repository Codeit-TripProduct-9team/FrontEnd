import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';
import { CookiesProvider } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setPageLoad(true);
  }, []);

  if (!pageLoad) return;
  return (
    <CookiesProvider>
      <OverlayProvider>
        <Component {...pageProps} />
      </OverlayProvider>
    </CookiesProvider>
  );
}
