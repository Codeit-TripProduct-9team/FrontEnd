import Image from 'next/image';

import SignStar from '@/public/assets/icon/star.svg';

interface ReviewDataProps {
  sortedReview: ReviewDataItem[];
}

interface ReviewDataItem {
  id: number;
  title: string;
  likes: number;
  nickname: string;
  descrpition: string;
  createdAt: string;
  score: number;
}

const ReviewList = ({ sortedReview }: ReviewDataProps) => {
  return (
    <ul className="flex flex-col gap-30">
      {sortedReview &&
        sortedReview.map(({ id, title, likes, nickname, descrpition, createdAt, score }) => (
          <li key={id}>
            <h2>{title}</h2>
            <div>❤{likes}</div>
            <p>{descrpition}</p>
            <div>{nickname}</div>
            <div className="flex gap-10">
              {Array(score)
                .fill(0)
                .map((_, i) => (
                  <Image key={i} src={SignStar} width={25} height={25} alt="star" />
                ))}
            </div>
            <div>{createdAt}</div>
          </li>
        ))}
    </ul>
  );
};

export default ReviewList;
