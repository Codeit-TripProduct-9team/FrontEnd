import TravelInformtaionContent from '@/src/components/TravelInformationContent';
import Head from 'next/head';

const TravelInformation = () => {
  return (
    <>
      <Head>
        <title>uTrip</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content={'상세페이지'} />
        <meta property="og:image" content="https://i.ytimg.com/vi/or2TgTRjPq8/maxresdefault.jpg" />
        <meta property="og:image:alt" content="alt" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={'utrip: 상세페이지'} />
        <meta property="og:type" content="website" />
      </Head>
      <TravelInformtaionContent />
    </>
  );
};

export default TravelInformation;
