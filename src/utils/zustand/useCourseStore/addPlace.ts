import { CourseStore, Place } from './useCourseStore';

interface AddPlaceProps {
  (state: CourseStore, courseId: number, day: number, newPlace: Place): CourseStore;
}

const addPlace: AddPlaceProps = (state, courseId, day, newPlace) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    const dayIndex = state.data.course[courseIndex].plan.findIndex((plan) => plan.day === day);
    if (dayIndex !== -1) {
      const newCourse = [...state.data.course];
      const newPlan = [...newCourse[courseIndex].plan];
      const newPlaceList = [...newPlan[dayIndex].place, newPlace];

      newPlan[dayIndex].place = newPlaceList;

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
  return { ...state };
};

export default addPlace;
