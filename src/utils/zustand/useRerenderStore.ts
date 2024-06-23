import { create } from 'zustand';

interface reRenderInterface {
  reRender: boolean;
  setRerender: (state: boolean) => void;
}

export const useRerenderStore = create<reRenderInterface>((set) => ({
  reRender: false,
  setRerender: (state) => set({ reRender: state }),
}));
