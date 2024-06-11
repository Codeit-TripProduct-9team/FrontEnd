import instance from './axios';

interface getReviewProps {
  videoId: string;
  sortType: string;
}

export const getReview = async ({ videoId, sortType }: getReviewProps) => {
  const response = await instance.get(`/video/${videoId}/reviews?sort=${sortType}&page=0`);
  return response.data;
};
