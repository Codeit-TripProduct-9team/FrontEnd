import YouTube from 'react-youtube';

interface YoutubePlayerProps {
  youtubeLink: string;
}

const YoutubePlayer = ({ youtubeLink }: YoutubePlayerProps) => {
  const videoId = youtubeLink.split('v=')[1];

  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: '400',
        height: '200',
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
