import { VideoInformationProps } from '@/src/lib/types';
import Head from 'next/head';

interface TravelInformationMeatProps {
  youtubeData: VideoInformationProps | undefined;
  pageUrl: string;
}

const TravelInformationMeta = ({ youtubeData, pageUrl }: TravelInformationMeatProps) => {
  return (
    <Head>
      <title>uTrip</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" />

      <meta property="og:image" />
      <meta property="og:image:alt" content="img" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={youtubeData?.title} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={youtubeData?.title} />
      <meta name="twitter:description" content={youtubeData?.content} />
    </Head>
  );
};

export default TravelInformationMeta;
