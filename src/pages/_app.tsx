import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';
import { CookiesProvider } from 'react-cookie';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function App({ Component, pageProps }: AppProps) {
  const [pageLoad, setPageLoad] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    setPageLoad(true);
  }, []);

  if (!pageLoad) return;
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <OverlayProvider>
          <Component {...pageProps} />
        </OverlayProvider>
      </CookiesProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
