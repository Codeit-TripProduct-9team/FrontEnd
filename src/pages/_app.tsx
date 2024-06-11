import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <OverlayProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </OverlayProvider>
  );
}
