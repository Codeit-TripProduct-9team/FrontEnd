import { CourseStore } from './useCourseStore';

interface RemovePlaceProps {
  (state: CourseStore, courseId: number, placeIndex: number): CourseStore;
}

const removePlace: RemovePlaceProps = (state, courseId, placeIndex) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    for (let j = 0; j < state.data.course[courseIndex].plan.length; j++) {
      const placeIndexInDay = state.data.course[courseIndex].plan[j].place.findIndex(
        (place) => place.index === placeIndex,
      );
      if (placeIndexInDay !== -1) {
        state.data.course[courseIndex].plan[j].place.splice(placeIndexInDay, 1);
        break;
      }
    }
  }
  let globalIndex = 1;
  for (let j = 0; j < state.data.course[courseIndex].plan.length; j++) {
    for (let i = 0; i < state.data.course[courseIndex].plan[j].place.length; i++) {
      state.data.course[courseIndex].plan[j].place[i].index = globalIndex++;
    }
  }

  return { ...state };
};

export default removePlace;
