import { CourseStore } from './useCourseStore';

interface MovePlaceProps {
  (
    state: CourseStore,
    courseId: number,
    fromDay: number,
    fromIndex: number,
    toDay: number,
    toIndex: number,
  ): CourseStore;
}

const movePlace: MovePlaceProps = (state, courseId, fromDay, fromIndex, toDay, toIndex) => {
  const course = state.data.course;
  const courseIndex = course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    const fromPlanIndex = course[courseIndex].plan.findIndex((plan) => plan.day === fromDay);
    const toPlanIndex = course[courseIndex].plan.findIndex((plan) => plan.day === toDay);
    if (fromPlanIndex !== -1 && toPlanIndex !== -1) {
      const fromPlaceIndex = course[courseIndex].plan[fromPlanIndex].place.findIndex(
        (place) => place.index === fromIndex,
      );
      const toPlaceIndex = course[courseIndex].plan[toPlanIndex].place.findIndex((place) => place.index === toIndex);
      if (fromPlaceIndex !== -1) {
        const newCourse = [...state.data.course];
        const newPlan = newCourse[courseIndex].plan.map((day) => ({ ...day, place: [...day.place] }));

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

        newCourse[courseIndex].plan = newPlan;
        return { ...state, data: { ...state.data, course: newCourse } };
      }
    }
  }
  return { ...state };
};

export default movePlace;
