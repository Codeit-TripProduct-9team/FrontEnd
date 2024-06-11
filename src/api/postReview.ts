import instance from './axios';

export interface PostReviewProps {
  videoId: string;
  title: string;
  nickname: string;
  content: string;
  score: number;
}

const PostReview = async ({ videoId, title, nickname, content, score }: PostReviewProps) => {
  const token = getAccessToken();
  const body = { title: title, nickname: nickname, content: content, score: score };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await instance.post(`/video/${videoId}/review`, body, { headers });
  return response.data;
};

export default PostReview;

const ACCESS_TOKEN = 'accessToken';

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  return null;
};
