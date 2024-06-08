import { useRouter } from 'next/router';
import { useRef } from 'react';
import { YouTubeProps } from 'react-youtube';

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
}

const useYouTubePlayer = () => {
  const router = useRouter();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const videoSize = router.pathname === '/travel-information/[id]' ? 589 : 700;
  const autoPlay = router.pathname === '/travel-information/[id]' ? false : true;

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
  };

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (autoPlay && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  return { videoSize, onReady, onMouseEnter, onMouseLeave, autoPlay };
};

export default useYouTubePlayer;
