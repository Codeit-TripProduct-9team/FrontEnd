import { CourseStore } from './useCourseStore';
import reorderIndex from '../../reorderIndex';

interface RemoveDayProps {
  (state: CourseStore, dayIndex: number): CourseStore;
}

const removeDay: RemoveDayProps = (state, dayIndex) => {
  const newPlan = [...state.data.plan];
  newPlan.splice(dayIndex - 1, 1);

  // Reassign days in ascending order starting from 1
  newPlan.forEach((day, index) => {
    day.day = index + 1;
  });

  reorderIndex(newPlan);

  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default removeDay;
