import { create } from 'zustand';

interface MyPlace {
  index: number;
  name: string;
  img: string;
  description: string;
  posX: number;
  posY: number;
}

type MyPlaceStore = {
  data: MyPlace[];
  setData: (by: MyPlace[]) => void;
};

export const useMyPlaceStore = create<MyPlaceStore>((set) => ({
  data: [],
  setData: (data) => set((state) => ({ ...state, data })),
}));
