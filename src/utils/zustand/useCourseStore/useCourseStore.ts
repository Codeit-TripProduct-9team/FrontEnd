import { create } from 'zustand';
import addDay from './addDay';
import removeDay from './removeDay';
import addPlace from './addPlace';
import removePlace from './removePlace';
import movePlace from './movePlace';
import setData from './setData';
import { Course, Place, Plan } from '@/src/lib/types';

export type CourseStore = {
  data: Course;
  setData: (by: Course) => void;
  addDay: (newDay: Plan) => void;
  removeDay: (dayIndex: number) => void;
  addPlace: (day: number, newPlace: Place) => void;
  removePlace: (placeIndex: number) => void;
  movePlace: (fromDay: number, fromIndex: number, toDay: number, toIndex: number) => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
  data: { name: '', plan: [] },
  setData: (data) => set((state) => setData(state, data)),
  addDay: (newDay) => set((state) => addDay(state, newDay)),
  removeDay: (dayIndex) => set((state) => removeDay(state, dayIndex)),
  addPlace: (day, newPlace) => set((state) => addPlace(state, day, newPlace)),
  removePlace: (placeIndex) => set((state) => removePlace(state, placeIndex)),
  movePlace: (fromDay, fromIndex, toDay, toIndex) =>
    set((state) => movePlace(state, fromDay, fromIndex, toDay, toIndex)),
}));
