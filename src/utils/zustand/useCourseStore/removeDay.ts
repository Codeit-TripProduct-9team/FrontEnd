import { CourseStore } from './useCourseStore';

interface RemoveDayProps {
  (state: CourseStore, courseId: number, dayIndex: number): CourseStore;
}

const removeDay: RemoveDayProps = (state, courseId, dayIndex) => {
  const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
  if (courseIndex !== -1) {
    const newCourse = [...state.data.course];
    const newPlan = [...newCourse[courseIndex].plan];
    newPlan.splice(dayIndex - 1, 1);

    // Reassign days in ascending order starting from 1
    newPlan.forEach((day, index) => {
      day.day = index + 1;
    });

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
  return { ...state };
};

export default removeDay;
