import { create } from 'zustand';

interface State {
  appTitle: string;
  menuOpen: boolean;
}

export const useSettings = create<State>(() => ({
  appTitle: 'Admin CP',
  menuOpen: false
}));

const set = useSettings.setState;

export async function setAppTitle(appTitle: string) {
  set({ appTitle });
}

export async function setMenuOpen(menuOpen: boolean) {
  set({ menuOpen });
}