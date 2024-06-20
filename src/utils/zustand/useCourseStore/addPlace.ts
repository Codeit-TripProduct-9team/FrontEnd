import { CourseStore } from './useCourseStore';
import { Place } from '@/src/lib/types';

interface AddPlaceProps {
  (state: CourseStore, day: number, newPlace: Place): CourseStore;
}

const addPlace: AddPlaceProps = (state, day, newPlace) => {
  const dayIndex = state.data.plan.findIndex((plan) => plan.day === day);
  if (dayIndex !== -1) {
    const newPlan = [...state.data.plan];
    const newPlaceList = [...newPlan[dayIndex].place, newPlace];

    newPlan[dayIndex].place = newPlaceList;

    // Reassign index values in ascending order
    let globalIndex = 1;
    for (let j = 0; j < newPlan.length; j++) {
      for (let i = 0; i < newPlan[j].place.length; i++) {
        newPlan[j].place[i].index = globalIndex++;
      }
    }
    return { ...state, data: { ...state.data, plan: newPlan } };
  }
};

export default addPlace;
