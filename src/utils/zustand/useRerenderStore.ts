import { create } from 'zustand';

interface reRenderInterface {
  reRender: boolean;
  setRerender: (state: boolean) => void;
}

interface MyPageRerenderInterface {
  myPageRerender: boolean;
  setMyPageRerender: (state: boolean) => void;
}

interface skeletonInterface {
  skeleton: boolean;
  setSkeleton: (state: boolean) => void;
}

export const useRerenderStore = create<reRenderInterface>((set) => ({
  reRender: false,
  setRerender: (state) => set({ reRender: state }),
}));

export const useSkeletonStore = create<skeletonInterface>((set) => ({
  skeleton: false,
  setSkeleton: (state) => set({ skeleton: state }),
}));

export const useMyPageRerenderStore = create<MyPageRerenderInterface>((set) => ({
  myPageRerender: false,
  setMyPageRerender: (state) => set({ myPageRerender: state }),
}));
