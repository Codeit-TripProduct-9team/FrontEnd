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

      let globalIndex = 1;
      newPlan.forEach((day) => {
        day.place = day.place.map((place) => ({
          ...place,
          index: globalIndex++,
        }));
      });

      newPlan[dayIndex].place = newPlaceList;
      newCourse[courseIndex].plan = newPlan;
      return { ...state, data: { ...state.data, course: newCourse } };
    }
  }
  return { ...state };
};

export default addPlace;
