import ReviewTextArea from './ReveiwTextarea';
import ReviewScore from './ReviewScore';

const CreateReview = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 border-b-1 border-gray-50">
      <h1 className="text-24 font-bold">리뷰를 작성해 주세요.</h1>
      <ReviewScore />
      <ReviewTextArea />
    </div>
  );
};

export default CreateReview;
