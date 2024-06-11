import convertDate from '@/src/utils/convertDate';
import convertViewCount from '@/src/utils/convertViewCount';
import { useQuery } from 'react-query';
import getYoutubeData from '../api/getYoutubeData';

const useYouTubeData = (videoId: string) => {
  const { data: youtubeInfo } = useQuery({
    queryKey: ['youtubeData', videoId],
    queryFn: () => getYoutubeData(videoId),
    enabled: !!videoId,
  });

  const result = youtubeInfo?.items[0];
  const viewCount = result?.statistics.viewCount;
  const updatedAt = result?.snippet.publishedAt;
  const thumbnail = result?.snippet?.thumbnails?.default?.url;

  return { viewCount: convertViewCount(viewCount), updatedAt: convertDate(updatedAt), thumbnail: thumbnail }; // 변수명 수정
};

export default useYouTubeData;
