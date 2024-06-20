import { CourseStore } from './useCourseStore';
import { Plan } from '@/src/lib/types';

interface AddDayProps {
  (state: CourseStore, newDay: Plan): CourseStore;
}

const addDay: AddDayProps = (state, newDay) => {
  const newCourse = [...state.data.plan];
  const newPlan = [...newCourse, newDay];
  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default addDay;
