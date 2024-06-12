import { VideoInformationProps } from '@/src/lib/types';
import VideoInformation from './VideoInformation';
import YoutubePlayer from './YoutubePlyaer';
import VideoInformationSkeleton from '../../common/skeleton/videonInformationSkeleton';

interface TravelProductProps {
  youtubeData: VideoInformationProps | null;
  loading: boolean;
}

const TravelProduct = ({ youtubeData, loading }: TravelProductProps) => {
  const youtubeId = youtubeData?.url?.split('v=')[1] as string;

  return (
    <section className="flex mt-48 mb-80 mx-120 p-35 gap-32 rounded-l bg-white">
      {loading ? (
        <VideoInformationSkeleton />
      ) : (
        <>
          <YoutubePlayer youtubeId={youtubeId} />
          <VideoInformation youtubeData={youtubeData} youtubeId={youtubeId} />
        </>
      )}
    </section>
  );
};

export default TravelProduct;
