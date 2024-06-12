import useYouTubeData from '@/src/hooks/useYouTubeData';
import { VideoInformationProps } from '@/src/lib/types';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface TravelInformationMeatProps {
  youtubeData: VideoInformationProps | null;
}

const TravelInformationMeta = ({ youtubeData }: TravelInformationMeatProps) => {
  const { thumbnail } = useYouTubeData(useRouter().query.id as string);
  return (
    <Head>
      <title>uTrip</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" />

      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:alt" content="img" />
      <meta property="og:url" content={useRouter().asPath} />
      <meta property="og:title" content={youtubeData?.title} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={useRouter().asPath} />
      <meta name="twitter:title" content={youtubeData?.title} />
      <meta name="twitter:description" content={youtubeData?.content} />
      <meta name="twitter:image" content={thumbnail} />
    </Head>
  );
};

export default TravelInformationMeta;
