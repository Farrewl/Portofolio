import { create } from 'zustand';

export type AppId =
  | 'about'
  | 'projects'
  | 'cv'
  | 'skills'
  | 'contact'
  | 'terminal'
  | 'settings'
  | 'trash';

export interface WindowState {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  openedAt: number;
}

interface OSState {
  isBooted: boolean;
  isEntered: boolean;
  windows: Record<string, WindowState>;
  focusedId: AppId | null;
  cascade: number;
  setBooted: (v: boolean) => void;
  setEntered: (v: boolean) => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  restoreApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  restart: () => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  isBooted: false,
  isEntered: false,
  windows: {},
  focusedId: null,
  cascade: 0,
  setBooted: (v) => set({ isBooted: v }),
  setEntered: (v) => set({ isEntered: v }),
  openApp: (id) => {
    const state = get();
    const existing = state.windows[id];
    const topZ = Math.max(0, ...Object.values(state.windows).map((w) => w.z));
    if (existing) {
      set({
        windows: {
          ...state.windows,
          [id]: { ...existing, minimized: false, z: topZ + 1 },
        },
        focusedId: id,
      });
      return;
    }
    set({
      windows: {
        ...state.windows,
        [id]: {
          id,
          z: topZ + 1,
          minimized: false,
          maximized: false,
          openedAt: Date.now(),
        },
      },
      focusedId: id,
      cascade: (state.cascade + 1) % 6,
    });
  },
  closeApp: (id) => {
    const state = get();
    const next = { ...state.windows };
    delete next[id];
    const ordered = Object.values(next).sort((a, b) => b.z - a.z);
    set({ windows: next, focusedId: ordered[0]?.id ?? null });
  },
  focusApp: (id) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;
    const topZ = Math.max(0, ...Object.values(state.windows).map((w) => w.z));
    if (state.focusedId === id && !win.minimized) return;
    set({
      windows: {
        ...state.windows,
        [id]: { ...win, minimized: false, z: topZ + 1 },
      },
      focusedId: id,
    });
  },
  minimizeApp: (id) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;
    const next = {
      ...state.windows,
      [id]: { ...win, minimized: true },
    };
    const ordered = Object.values(next)
      .filter((w) => !w.minimized)
      .sort((a, b) => b.z - a.z);
    set({ windows: next, focusedId: ordered[0]?.id ?? null });
  },
  restoreApp: (id) => {
    get().focusApp(id);
  },
  toggleMaximize: (id) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;
    set({
      windows: {
        ...state.windows,
        [id]: { ...win, maximized: !win.maximized },
      },
      focusedId: id,
    });
  },
  restart: () =>
    set({
      isBooted: false,
      isEntered: false,
      windows: {},
      focusedId: null,
      cascade: 0,
    }),
}));
