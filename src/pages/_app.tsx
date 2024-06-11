import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OverlayProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </OverlayProvider>
  );
}
