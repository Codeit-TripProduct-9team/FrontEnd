import CourseItem from './CourseItem';
import CourseData from './courseMock';

const MyCourseContent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center pb-40">
        <h3 className="text-24 font-bold py-60">저장된 코스 목록</h3>
        <section className="list-none">
          {CourseData.map((data, index) => (
            <CourseItem key={index} name={data.name} places={data.places} />
          ))}
        </section>
      </div>
    </>
  );
};

export default MyCourseContent;
