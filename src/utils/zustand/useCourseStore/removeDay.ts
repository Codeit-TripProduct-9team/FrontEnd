import { CourseStore } from './useCourseStore';

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

  // Reassign index values in ascending order
  let globalIndex = 1;
  for (let j = 0; j < newPlan.length; j++) {
    for (let i = 0; i < newPlan[j].place.length; i++) {
      newPlan[j].place[i].index = globalIndex++;
    }
  }
  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default removeDay;
