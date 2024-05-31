import VideoInformation from './VideoInformation';
import YoutubePlayer from './YoutubePlyaer';

interface YoutubedataProps {
  youtubeData: {
    id: number;
    url: string;
    thumbnail: string;
    likes: number;
    title: string;
    description: string;
    youtuber: string;
    tag: string[];
  };
}

const TravelProduct = ({ youtubeData }: YoutubedataProps) => {
  const videoId = youtubeData.url.split('v=')[1];

  return (
    <section className="flex mt-48 mb-80 mx-120 p-35 gap-32 rounded-l bg-white">
      <YoutubePlayer videoId={videoId} />
      <VideoInformation youtubeData={youtubeData} videoId={videoId} />
    </section>
  );
};

export default TravelProduct;
