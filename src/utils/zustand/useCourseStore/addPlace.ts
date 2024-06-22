import reorderIndex from '../../reorderIndex';
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

    reorderIndex(newPlan);

    return { ...state, data: { ...state.data, plan: newPlan } };
  }
};

export default addPlace;
