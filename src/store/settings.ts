import { create } from 'zustand';

interface Settings {
  appTitle: string;
  menuOpen: boolean;
}

interface State extends Settings {
  setSettings: (settings: Partial<Settings>) => void;
}

export const useSettings = create<State>((set) => ({
  appTitle: '',
  menuOpen: false,
  setSettings: (settings: Partial<Settings>) => set(settings)
}));
