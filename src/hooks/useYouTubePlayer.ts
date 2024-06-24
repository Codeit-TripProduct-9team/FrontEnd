import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
  const [loading, setLoading] = useState(false);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
  };

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    if (loading && playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (loading && autoPlay && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(true), 8000);
  }, []);

  return { videoSize, onReady, onMouseEnter, onMouseLeave, autoPlay };
};

export default useYouTubePlayer;
