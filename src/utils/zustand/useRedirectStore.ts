import create from 'zustand';

interface RedirectState {
  redirectUrl: string | null;
  setRedirectUrl: (url: string) => void;
  clearRedirectUrl: () => void;
}

export const useRedirectStore = create<RedirectState>((set) => ({
  redirectUrl: null,
  setRedirectUrl: (url: string) => set({ redirectUrl: url }),
  clearRedirectUrl: () => set({ redirectUrl: null }),
}));
