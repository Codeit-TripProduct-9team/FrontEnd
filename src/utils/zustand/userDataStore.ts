import { create } from 'zustand';

interface UserInformation {
  userData: {
    id: number;
    nickname: string;
    email: string;
  };
  setUserData: (data: { id: number; nickname: string; email: string }) => void;
}

export const userDataStore = create<UserInformation>((set) => ({
  userData: {
    id: 0,
    nickname: '',
    email: '',
  },
  setUserData: (data) => set({ userData: data }),
}));
