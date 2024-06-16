import { CourseStore } from './useCourseStore';

interface RemoveDayProps {
  (state: CourseStore, courseId: number, dayIndex: number): CourseStore;
}

const removeDay: RemoveDayProps = (state, courseId, dayIndex) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    state.data.course[courseIndex].plan.splice(dayIndex - 1, 1);

    // Reassign days in ascending order starting from 1
    state.data.course[courseIndex].plan.forEach((day, index) => {
      day.day = index + 1;
    });
  }
  return { ...state };
};

export default removeDay;
