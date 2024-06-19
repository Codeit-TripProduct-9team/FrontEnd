import { create } from 'zustand';
import addDay from './addDay';
import removeDay from './removeDay';
import addPlace from './addPlace';
import removePlace from './removePlace';
import movePlace from './movePlace';
import { CourseData, Place, Plan } from '@/src/lib/types';
import { mockMyCourse } from '../../../components/MyRouteContent/mockMyRoute';

export type CourseStore = {
  data: CourseData;
  setData: (by: CourseData) => void;
  addDay: (courseId: number, newDay: Plan) => void;
  removeDay: (courseId: number, dayIndex: number) => void;
  addPlace: (courseId: number, day: number, newPlace: Place) => void;
  removePlace: (courseId: number, placeIndex: number) => void;
  movePlace: (courseId: number, fromDay: number, fromIndex: number, toDay: number, toIndex: number) => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
  data: mockMyCourse,
  setData: (data) => set((state) => ({ ...state, data })),
  addDay: (courseId, newDay) => set((state) => addDay(state, courseId, newDay)),
  removeDay: (courseId, dayIndex) => set((state) => removeDay(state, courseId, dayIndex)),
  addPlace: (courseId, day, newPlace) => set((state) => addPlace(state, courseId, day, newPlace)),
  removePlace: (courseId, placeIndex) => set((state) => removePlace(state, courseId, placeIndex)),
  movePlace: (courseId, fromDay, fromIndex, toDay, toIndex) =>
    set((state) => movePlace(state, courseId, fromDay, fromIndex, toDay, toIndex)),
}));
