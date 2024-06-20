import { CourseStore } from './useCourseStore';

interface RemovePlaceProps {
  (state: CourseStore, placeIndex: number): CourseStore;
}

const removePlace: RemovePlaceProps = (state, placeIndex) => {
  const newCourse = [...state.data.plan];
  const newPlan = newCourse.map((day) => ({
    ...day,
    place: day.place.filter((place) => place.index !== placeIndex),
  }));

  // Reassign index values in ascending order
  let globalIndex = 1;
  for (let j = 0; j < newPlan.length; j++) {
    for (let i = 0; i < newPlan[j].place.length; i++) {
      newPlan[j].place[i].index = globalIndex++;
    }
  }

  return { ...state, data: { ...state.data, plan: newPlan } };
};

export default removePlace;
