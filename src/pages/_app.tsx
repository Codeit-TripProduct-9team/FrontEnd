import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';
import { QueryClient } from 'react-query';
import { CookiesProvider } from 'react-cookie';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <OverlayProvider>
        <Component {...pageProps} />
      </OverlayProvider>
    </CookiesProvider>
  );
}
