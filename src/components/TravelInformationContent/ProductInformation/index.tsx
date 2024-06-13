import { VideoInformationProps } from '@/src/lib/types';
import VideoInformation from './VideoInformation';
import YoutubePlayer from './YoutubePlyaer';

interface TravelProductProps {
  youtubeData: VideoInformationProps | null;
}

const TravelProduct = ({ youtubeData }: TravelProductProps) => {
  const videoId = youtubeData?.url?.split('v=')[1];

  return (
    <section className="flex mt-48 mb-80 mx-120 p-35 gap-32 rounded-l bg-white">
      <YoutubePlayer videoId={videoId} />
      <VideoInformation youtubeData={youtubeData} videoId={videoId} />
    </section>
  );
};

export default TravelProduct;
