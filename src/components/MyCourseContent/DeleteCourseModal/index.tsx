import { getCookie } from '@/src/utils/cookie';
import Button from '../../common/button';
import myCoursePageRequestInstance from '@/src/api/mycoursePageRequest';
import { useRouter } from 'next/router';

type DeleteCourseModalProps = {
  courseId: number;
  courseName: string;
  close: () => void;
};
const DeleteCourseModal = ({ courseId, courseName, close }: DeleteCourseModalProps) => {
  const router = useRouter();
  const hasToken = getCookie('userId');
  console.log(courseId, hasToken);
  const handleDeleteCourse = async () => {
    try {
      await myCoursePageRequestInstance.deleteCourseList(hasToken, courseId);
    } catch (error) {
      console.error('Error delete course list:', error);
    } finally {
      close();
      router.reload();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-20">
      <strong className="text-24">
        {courseName}을(를) <span className="text-red">삭제</span>하시겠습니까?
      </strong>
      <p>삭제된 코스는 복구할 수 없습니다</p>
      <div className="flex items-center gap-10 text-center mt-30">
        <Button className="w-80 h-50" onClick={handleDeleteCourse}>
          예
        </Button>
        <Button className="w-80 h-50 bg-rose-400" onClick={close}>
          아니오
        </Button>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
