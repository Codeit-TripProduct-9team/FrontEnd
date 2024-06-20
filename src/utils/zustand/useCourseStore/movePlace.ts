import { CourseStore } from './useCourseStore';

interface MovePlaceProps {
  (state: CourseStore, fromDay: number, fromIndex: number, toDay: number, toIndex: number): CourseStore;
}

const movePlace: MovePlaceProps = (state, fromDay, fromIndex, toDay, toIndex) => {
  const course = state.data.plan;
  const fromPlanIndex = course.findIndex((plan) => plan.day === fromDay);
  const toPlanIndex = course.findIndex((plan) => plan.day === toDay);
  if (fromPlanIndex !== -1 && toPlanIndex !== -1) {
    const fromPlaceIndex = course[fromPlanIndex].place.findIndex((place) => place.index === fromIndex);
    const toPlaceIndex = course[toPlanIndex].place.findIndex((place) => place.index === toIndex);
    if (fromPlaceIndex !== -1) {
      const newCourse = [...state.data.plan];
      const newPlan = newCourse.map((day) => ({ ...day, place: [...day.place] }));

      // Extract the place to move
      const placeToMove = { ...newPlan[fromPlanIndex].place[fromPlaceIndex] };

      // Remove place from the original day
      newPlan[fromPlanIndex].place.splice(fromPlaceIndex, 1);

      // Add place to the new day at the target index
      newPlan[toPlanIndex].place.splice(toPlaceIndex, 0, placeToMove);

      // Reassign index values in ascending order
      let globalIndex = 1;
      for (let j = 0; j < newPlan.length; j++) {
        for (let i = 0; i < newPlan[j].place.length; i++) {
          newPlan[j].place[i].index = globalIndex++;
        }
      }
      return { ...state, data: { ...state.data, plan: newPlan } };
    }
  }

  return { ...state };
};

export default movePlace;
