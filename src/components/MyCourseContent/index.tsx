import CourseItem from './CourseItem';
import items from './courseMock';

const MyCourseContent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center pb-40">
        <h3 className="text-24 font-bold py-60">저장된 코스 목록</h3>
        <section className="list-none">
          {items.course.map((data) => (
            <CourseItem key={data.id} id={data.id} name={data.name} plan={data.plan} />
          ))}
        </section>
      </div>
    </>
  );
};

export default MyCourseContent;
