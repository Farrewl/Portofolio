import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WallpaperId = 'city-night' | 'sunset' | 'matrix' | 'aurora';
export type JokeFrequency = 'off' | 'rare' | 'normal' | 'often';

interface SettingsState {
  wallpaper: WallpaperId;
  theme: 'dark' | 'light';
  sound: boolean;
  showMascot: boolean;
  performance: 'auto' | 'high' | 'lite';
  jokeFrequency: JokeFrequency;
  setWallpaper: (w: WallpaperId) => void;
  setTheme: (t: 'dark' | 'light') => void;
  setSound: (v: boolean) => void;
  setShowMascot: (v: boolean) => void;
  setPerformance: (p: 'auto' | 'high' | 'lite') => void;
  setJokeFrequency: (f: JokeFrequency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      wallpaper: 'city-night',
      theme: 'dark',
      sound: false,
      showMascot: true,
      performance: 'auto',
      jokeFrequency: 'normal',
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setTheme: (theme) => set({ theme }),
      setSound: (sound) => set({ sound }),
      setShowMascot: (showMascot) => set({ showMascot }),
      setPerformance: (performance) => set({ performance }),
      setJokeFrequency: (jokeFrequency) => set({ jokeFrequency }),
    }),
    { name: 'portfolio-os-settings' },
  ),
);
