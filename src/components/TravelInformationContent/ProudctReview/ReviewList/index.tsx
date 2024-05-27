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
}

const ReviewList = ({ sortedReview }: ReviewDataProps) => {
  return (
    <ul className="flex flex-col gap-30">
      {sortedReview &&
        sortedReview.map(({ id, title, likes, nickname, descrpition, createdAt }) => (
          <li key={id}>
            <h2>{title}</h2>
            <div>❤{likes}</div>
            <p>{descrpition}</p>
            <div>{nickname}</div>
            <div>{createdAt}</div>
          </li>
        ))}
    </ul>
  );
};

export default ReviewList;
