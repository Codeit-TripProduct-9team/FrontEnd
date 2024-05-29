import Button from '../common/button';

const MypageContent = () => {
  return (
    <>
      <section className="my-20 flex items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center text-center bg-white py-40 w-full mx-110 rounded-l">
          <h2 className="text-36 font-bold">My Page</h2>
          <p className="text-gray-50">
            저장된 코스중 마음에 드는 코스를 골라
            <br />
            당신의 여행에 반영해 보세요
          </p>
          <Button className="w-150 h-40 font-bold">지금 코스짜기</Button>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default MypageContent;
