import YouTube from 'react-youtube';

import useYouTubePlayer from '@/src/hooks/useYouTubePlayer';

interface YoutubePlayerProps {
  videoId: string | undefined;
}

const YoutubePlayer = ({ videoId }: YoutubePlayerProps) => {
  const { videoSize, onReady, onMouseEnter, onMouseLeave } = useYouTubePlayer();

  return (
    <div
      className="flex items-center justify-center min-w-568 rounded-l overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <YouTube
        videoId={videoId}
        opts={{
          width: `${videoSize}`,
          height: '378',
          plyaerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
          },
        }}
        onReady={onReady}
        onEnd={(event) => {
          event.target.stopVideo(0);
        }}
      />
    </div>
  );
};

export default YoutubePlayer;
