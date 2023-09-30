import { create } from 'zustand';

export type Sizing = {
  id: string;
  bust: string;
  waist: string;
  hip: string;
  back: string;
  cleavage: string;
  arm: string;
  sleeve: string;
  crotch: string;
  bustHeight: string;
  bodyLength: string;
  skirtLength: string;
  pantsLength: string;
};

export interface State {
  sizings: Sizing[];
  setSizings: (sizings: Sizing[]) => void;
  upsertSizing: (sizing: Sizing) => void;
  removeSizing: (id: Sizing['id']) => void;

  selectedSizing: Partial<Sizing>;
  updateSelectedSizing: (sizing: Partial<Sizing>) => void;
  clearSelectedSizing: () => void;
}

export const useSizings = create<State>((set, get) => ({
  // SIZINGS LIST
  sizings: [],
  setSizings: (sizings: Sizing[]) => set({ sizings }),
  removeSizing: (id: Sizing['id']) => set({ sizings: get().sizings.filter((s) => s.id !== id) }),
  upsertSizing: (newSize: Sizing) => set(({ sizings }) => ({
    sizings: sizings.find(s => s.id === newSize.id)
      ? sizings.map((m) => (m.id === newSize.id ? newSize : m))
      : [...sizings, newSize]
  })),

  // SELECTED SIZING
  selectedSizing: {},
  updateSelectedSizing: (updates: Partial<Sizing>) => set({ selectedSizing: { ...get().selectedSizing, ...updates } }),
  clearSelectedSizing: () => set({ selectedSizing: {} }),
}));
