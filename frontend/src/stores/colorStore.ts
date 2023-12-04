import {create} from 'zustand';

type ColorStore = {
  colorValues: string[];
  setColorValues: (colors: string[]) => void;
};

export const useColorStore = create<ColorStore>((set) => ({
  colorValues: [],
  setColorValues: (colors) => set({ colorValues: colors }),
}));