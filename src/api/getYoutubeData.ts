import instance from './axios';
import { BASED_URL } from '../constants/constants';

const getYoutubeData = async (videoId: string | undefined) => {
  const part = 'snippet,statistics';
  const response = await instance.get(
    `${BASED_URL.YOUTUBE_API}/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=${part}`,
  );
  return response.data;
};

export default getYoutubeData;
