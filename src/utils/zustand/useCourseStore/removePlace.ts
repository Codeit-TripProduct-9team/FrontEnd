import { CourseStore } from './useCourseStore';
import reorderIndex from '../../reorderIndex';

interface RemovePlaceProps {
  (state: CourseStore, placeIndex: number): CourseStore;
}

const removePlace: RemovePlaceProps = (state, placeIndex) => {
  const newCourse = [...state.data.plan];
  const newPlan = newCourse.map((day) => ({
    ...day,
    place: day.place.filter((place) => place.index !== placeIndex),
  }));

  reorderIndex(newPlan);

  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default removePlace;
