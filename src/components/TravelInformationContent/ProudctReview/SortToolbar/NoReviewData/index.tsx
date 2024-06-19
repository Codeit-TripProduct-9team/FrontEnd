interface NoReviewDataProps {
  message: string;
}

const NoReivewData = ({ message }: NoReviewDataProps) => {
  return (
    <div className="flex justify-center items-center mt-200 mb-200 text-20 font-bold">
      <p>{message}</p>
    </div>
  );
};

export default NoReivewData;
