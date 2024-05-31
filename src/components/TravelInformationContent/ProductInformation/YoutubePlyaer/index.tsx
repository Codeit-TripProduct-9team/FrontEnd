import YouTube from 'react-youtube';

interface YoutubePlayerProps {
  videoId: string;
}

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: '589',
        height: '378',
        plyaerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
      }}
      onEnd={(event) => {
        event.target.stopVideo(0);
      }}
    />
  );
};

export default YoutubePlayer;
