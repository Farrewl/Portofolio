import { create } from 'zustand';

export type Expression =
  | 'neutral'
  | 'happy'
  | 'laugh'
  | 'wink'
  | 'surprised'
  | 'sad'
  | 'angry'
  | 'smug'
  | 'love'
  | 'thinking'
  | 'sleepy'
  | 'dizzy'
  | 'blush'
  | 'glitch';

export interface Speech {
  id: number;
  text: string;
  expression: Expression;
  ttl?: number;
}

interface MascotState {
  expression: Expression;
  queue: Speech[];
  current: Speech | null;
  paused: boolean;
  hidden: boolean;
  setExpression: (e: Expression) => void;
  enqueue: (text: string, expression: Expression) => void;
  next: () => void;
  setPaused: (v: boolean) => void;
  setHidden: (v: boolean) => void;
}

let speechId = 0;

export const useMascotStore = create<MascotState>((set, get) => ({
  expression: 'neutral',
  queue: [],
  current: null,
  paused: false,
  hidden: false,
  setExpression: (expression) => set({ expression }),
  enqueue: (text, expression) => {
    const speech: Speech = {
      id: ++speechId,
      text,
      expression,
      ttl: Math.min(6500, Math.max(3000, text.length * 75)),
    };
    const { current, queue } = get();
    if (!current) {
      set({ current: speech, expression });
      return;
    }
    set({ queue: [...queue, speech] });
  },
  next: () => {
    const { queue } = get();
    const [head, ...rest] = queue;
    set({
      current: head ?? null,
      queue: rest,
      expression: head?.expression ?? 'neutral',
    });
  },
  setPaused: (paused) => set({ paused }),
  setHidden: (hidden) => set({ hidden }),
}));
