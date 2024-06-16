import { CourseStore, Plan } from './useCourseStore';

interface AddDayProps {
  (state: CourseStore, courseId: number, newDay: Plan): CourseStore;
}

const addDay: AddDayProps = (state, courseId, newDay) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    state.data.course[courseIndex].plan.push(newDay);
  }
  return { ...state };
};

export default addDay;
