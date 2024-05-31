import Image from 'next/image';

import star from '@/public/assets/icon/star.svg';
import emptyStar from '@/public/assets/icon/star-black.svg';

import convertDate from '@/src/utils/convertDate';

interface ReviewDataProps {
  sortedReview: ReviewDataItem[];
}

interface ReviewDataItem {
  id: number;
  likes: number;
  nickname: string;
  descrpition: string;
  createdAt: string;
  score: number;
}

const ReviewList = ({ sortedReview }: ReviewDataProps) => {
  return (
    <div className="flex flex-col py-32">
      <ul className="flex flex-col gap-32 ">
        {sortedReview &&
          sortedReview.map(({ id, nickname, descrpition, createdAt, score }) => (
            <li key={id} className="pb-32 border-b-1 border-gray-50">
              <div className="flex items-end gap-8 pb-8">
                <h2 className="text-18 font-bold">{nickname}</h2>
                <div className="text-12 text-gray-50">{convertDate(createdAt)}</div>
              </div>
              <div className="flex gap-5 pb-16">
                {[...Array(5)].map((_, index) => (
                  <Image key={index} src={index < score ? star : emptyStar} width={25} height={25} alt="star" />
                ))}
              </div>
              <p>{descrpition}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ReviewList;
