import CourseItem from './CourseItem';
import myCoursePageRequestInstance from '@/src/api/mycoursePageRequest';
import { CourseData } from '@/src/lib/types';
import { useEffect, useState } from 'react';
import Button from '../common/button';
import Link from 'next/link';

const MyCourseContent = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  useEffect(() => {
    const fetchMyCourseList = async () => {
      try {
        //user id 들어갈 예정
        const course = await myCoursePageRequestInstance.getCourseList(52);
        console.log(course);
        setCourseData(course);
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    };
    fetchMyCourseList();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center pb-40">
        <h3 className="text-24 font-bold py-60">저장된 코스 목록</h3>
        <section className="list-none">
          {courseData.course.length > 0 ? (
            courseData.course.map((data) => <CourseItem key={data.id} id={data.id} name={data.name} plan={data.plan} />)
          ) : (
            <div className="flex flex-col items-center gap-10">
              <strong className="text-20">저장된 코스 목록이 존재하지 않습니다.</strong>
              <Button className="w-150 h-40 font-bold hover:bg-blue-500">
                <Link href="/my-route">지금 코스짜기</Link>
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MyCourseContent;
