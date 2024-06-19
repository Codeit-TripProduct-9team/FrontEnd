import { CourseStore, Plan } from './useCourseStore';

interface AddDayProps {
  (state: CourseStore, newDay: Plan): CourseStore;
}

const addDay: AddDayProps = (state, newDay) => {
  const newCourse = [...state.data.plan];
  const newPlan = [...newCourse, newDay];
  // newCourse = newPlan;
  return { ...state, data: { ...state.data, plan: newPlan } };
};

// export default addDay;
// const addDay: AddDayProps = (state, newDay) => {
//   const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
//   if (courseIndex !== -1) {
//     const newCourse = [...state.data.course];
//     const newPlan = [...newCourse[courseIndex].plan, newDay];
//     newCourse[courseIndex].plan = newPlan;
//     return { ...state, data: { ...state.data, course: newCourse } };
//   }
//   return { ...state };
// };

export default addDay;
