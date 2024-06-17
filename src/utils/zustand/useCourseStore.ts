import { create } from 'zustand';

export interface Place {
  index: number;
  name: string;
  img: string;
  posX: number;
  posY: number;
}

interface Plan {
  day: number;
  place: Place[];
}

interface Course {
  id: number;
  name: string;
  plan: Plan[];
}

export interface CourseData {
  course: Course[];
}

type CourseStore = {
  data: CourseData;
  setData: (by: CourseData) => void;
  addDay: (courseId: number, newDay: Plan) => void;
  addPlace: (courseId: number, day: number, newPlace: Place) => void;
  removePlace: (courseId: number, placeIndex: number) => void;
  movePlace: (courseId: number, fromDay: number, fromIndex: number, toDay: number, toIndex: number) => void;
};

import { mockMyCourse } from '../../components/MyRouteContent/mockMyRoute';

export const useCourseStore = create<CourseStore>((set) => ({
  data: mockMyCourse,
  setData: (data) => set((state) => ({ ...state, data })),
  addDay: (courseId, newDay) =>
    set((state) => {
      const courseIndex = state.data.course.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        state.data.course[courseIndex].plan.push(newDay);
      }
      return { ...state };
    }),
  addPlace: (courseId, day, newPlace) =>
    set((state) => {
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
    }),
  removePlace: (courseId, placeIndex) =>
    set((state) => {
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
    }),

  movePlace: (courseId, fromDay, fromIndex, toDay, toIndex) =>
    set((state) => {
      const course = state.data.course;
      const courseIndex = course.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        const fromPlanIndex = course[courseIndex].plan.findIndex((plan) => plan.day === fromDay);
        const toPlanIndex = course[courseIndex].plan.findIndex((plan) => plan.day === toDay);
        if (fromPlanIndex !== -1 && toPlanIndex !== -1) {
          const fromPlaceIndex = course[courseIndex].plan[fromPlanIndex].place.findIndex(
            (place) => place.index === fromIndex,
          );
          const toPlaceIndex = course[courseIndex].plan[toPlanIndex].place.findIndex(
            (place) => place.index === toIndex,
          );
          if (fromPlaceIndex !== -1) {
            // 움직일 장소를 추출
            const placeToMove = course[courseIndex].plan[fromPlanIndex].place.splice(fromPlaceIndex, 1)[0];

            // 목표 인덱스에 붙혀넣기
            course[courseIndex].plan[toPlanIndex].place.splice(toPlaceIndex, 0, placeToMove);

            // 인덱스 값 오름차순으로 재지정
            let globalIndex = 1;
            for (let j = 0; j < state.data.course[courseIndex].plan.length; j++) {
              for (let i = 0; i < state.data.course[courseIndex].plan[j].place.length; i++) {
                course[courseIndex].plan[j].place[i].index = globalIndex++;
              }
            }
          }
        }
      }
      return { ...state };
    }),
}));
