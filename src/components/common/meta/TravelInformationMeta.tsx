import Head from 'next/head';
import { useRouter } from 'next/router';

import useYouTubeData from '@/src/hooks/useYouTubeData';
import { VideoInformationProps } from '@/src/lib/types';

interface TravelInformationMeatProps {
  youtubeData: VideoInformationProps | null;
}

const TravelInformationMeta = ({ youtubeData }: TravelInformationMeatProps) => {
  const route = useRouter();
  const youtubeId = route.query.id as string;
  const pagePath = route.asPath;

  const { thumbnail } = useYouTubeData(youtubeId);

  return (
    <Head>
      <title>{`uTrip - ${youtubeData?.title} `}</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" content={youtubeData?.title} />

      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:alt" content="img" />
      <meta property="og:url" content={pagePath} />
      <meta property="og:title" content={youtubeData?.title} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={pagePath} />
      <meta name="twitter:title" content={youtubeData?.title} />
      <meta name="twitter:description" content={youtubeData?.content} />
      <meta name="twitter:image" content={thumbnail} />
    </Head>
  );
};

export default TravelInformationMeta;
