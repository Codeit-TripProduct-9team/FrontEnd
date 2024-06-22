import { Course } from '@/src/lib/types';
import { Plan } from '@/src/lib/types';
import { CourseStore } from './useCourseStore';

interface SetDataProps {
  (state: CourseStore, data: Course): CourseStore;
}

const setData: SetDataProps = (state, data) => {
  const newPlan = [...data.plan];

  // Reassign index values in ascending order
  let globalIndex = 1;
  for (let j = 0; j < newPlan.length; j++) {
    for (let i = 0; i < newPlan[j].place.length; i++) {
      newPlan[j].place[i].index = globalIndex++;
    }
  }
  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default setData;
