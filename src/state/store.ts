import { create } from 'zustand';

type SceneState = {
  mouseX: number;
  mouseY: number;
  reducedMotion: boolean;
  setMouse: (x: number, y: number) => void;
  setReducedMotion: (v: boolean) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  mouseX: 0,
  mouseY: 0,
  reducedMotion: false,
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
}));
