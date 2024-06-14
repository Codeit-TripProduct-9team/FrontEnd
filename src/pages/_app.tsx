import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <OverlayProvider>
        <Component {...pageProps} />
      </OverlayProvider>
    </CookiesProvider>
  );
}
