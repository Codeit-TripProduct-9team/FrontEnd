import { create } from 'zustand';
import { MyPlace } from '@/src/lib/types';

type MyPlaceStore = {
  data: MyPlace[];
  setData: (by: MyPlace[]) => void;
};

export const useMyPlaceStore = create<MyPlaceStore>((set) => ({
  data: [],
  setData: (data) => set((state) => ({ ...state, data })),
}));
