import { create } from 'zustand';

interface MyPlace {
  id: number;
  title: string;
  url: string;
  tag: string[];
}

type MyPlaceStore = {
  data: MyPlace[];
  setData: (by: MyPlace[]) => void;
};

export const useMyPlaceStore = create<MyPlaceStore>((set) => ({
  data: [],
  setData: (data) => set((state) => ({ ...state, data })),
}));
