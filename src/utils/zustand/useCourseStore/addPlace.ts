import { CourseStore, Place } from './useCourseStore';

interface AddPlaceProps {
  (state: CourseStore, courseId: number, day: number, newPlace: Place): CourseStore;
}

const addPlace: AddPlaceProps = (state, courseId, day, newPlace) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    const dayIndex = state.data.course[courseIndex].plan.findIndex((plan) => plan.day === day);
    if (dayIndex !== -1) {
      state.data.course[courseIndex].plan[dayIndex].place.push(newPlace);
      let globalIndex = 1;
      for (let j = 0; j < state.data.course[courseIndex].plan.length; j++) {
        for (let i = 0; i < state.data.course[courseIndex].plan[j].place.length; i++) {
          state.data.course[courseIndex].plan[j].place[i].index = globalIndex++;
        }
      }
    }
  }
  return { ...state };
};

export default addPlace;
