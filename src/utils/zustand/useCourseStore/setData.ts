import { Course } from '@/src/lib/types';
import { CourseStore } from './useCourseStore';
import reorderIndex from '../../reorderIndex';

interface SetDataProps {
  (state: CourseStore, data: Course): CourseStore;
}

const setData: SetDataProps = (state, data) => {
  const newPlan = [...data.plan];

  reorderIndex(newPlan);
  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default setData;
