import YouTube from 'react-youtube';

interface YoutubePlayerProps {
  videoId: string;
}

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  return (
    <div className="flex items-center justify-center min-w-568 rounded-l overflow-hidden">
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
    </div>
  );
};

export default YoutubePlayer;
