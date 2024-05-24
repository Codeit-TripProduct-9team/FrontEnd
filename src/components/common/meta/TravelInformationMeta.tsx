import Head from 'next/head';

interface TravelInformationMeatProps {
  youtubeData: { url: string; thumbnail: string; likes: number; title: string; description: string; youtuber: string };
  pageUrl: string;
}

const TravelInformationMeta = ({ youtubeData, pageUrl }: TravelInformationMeatProps) => {
  return (
    <Head>
      <title>uTrip</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" content={'상세페이지'} />
      <meta property="og:image" content={youtubeData.thumbnail} />
      <meta property="og:image:alt" content="alt" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={'utrip: 상세페이지'} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default TravelInformationMeta;
