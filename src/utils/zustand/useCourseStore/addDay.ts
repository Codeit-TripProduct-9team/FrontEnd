import { CourseStore, Plan } from './useCourseStore';

interface AddDayProps {
  (state: CourseStore, courseId: number, newDay: Plan): CourseStore;
}

const addDay: AddDayProps = (state, courseId, newDay) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    const newCourse = [...state.data.course];
    const newPlan = [...newCourse[courseIndex].plan, newDay];
    newCourse[courseIndex].plan = newPlan;
    return { ...state, data: { ...state.data, course: newCourse } };
  }
  return { ...state };
};

export default addDay;
