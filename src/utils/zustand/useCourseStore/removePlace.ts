import { CourseStore } from './useCourseStore';

interface RemovePlaceProps {
  (state: CourseStore, courseId: number, placeIndex: number): CourseStore;
}

const removePlace: RemovePlaceProps = (state, courseId, placeIndex) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    const newCourse = [...state.data.course];
    const newPlan = newCourse[courseIndex].plan.map((day) => ({
      ...day,
      place: day.place.filter((place) => place.index !== placeIndex),
    }));

    let globalIndex = 1;
    newPlan.forEach((day) => {
      day.place = day.place.map((place) => ({
        ...place,
        index: globalIndex++,
      }));
    });

    newCourse[courseIndex].plan = newPlan;
    return { ...state, data: { ...state.data, course: newCourse } };
  }
  return { ...state };
};

export default removePlace;
