import { JOKES, JokeCategory } from '../data/jokes';
import { useMascotStore } from '../store/mascotStore';
import { useSettingsStore } from '../store/settingsStore';

const bags = new Map<string, number[]>();
let lastSpokenAt = 0;
let lastText = '';
const COOLDOWN = 8000;

const shuffle = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[k]] = [arr[k], arr[i]];
  }
  return arr;
};

const nextIndex = (category: string, length: number) => {
  let bag = bags.get(category);
  if (!bag || bag.length === 0) {
    bag = shuffle(Array.from({ length }, (_, i) => i));
    bags.set(category, bag);
  }
  let idx = bag.pop()!;
  if (length > 1 && JOKES[category]?.[idx]?.text === lastText) {
    bag.unshift(idx);
    idx = bag.pop()!;
  }
  return idx;
};

export const pickJoke = (category: JokeCategory) => {
  const bag = JOKES[category];
  if (!bag || bag.length === 0) return null;
  const idx = nextIndex(category, bag.length);
  const joke = bag[idx];
  lastText = joke.text;
  return joke;
};

const isTyping = () => {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || (el as HTMLElement).isContentEditable;
};

let audioCtx: AudioContext | null = null;
const beep = () => {
  if (!useSettingsStore.getState().sound) return;
  try {
    audioCtx ??= new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.value = 720;
    gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch {
    /* audio unsupported */
  }
};

interface SpeakOptions {
  force?: boolean;
  cooldown?: number;
}

export const speakJoke = (category: JokeCategory, opts: SpeakOptions = {}) => {
  const settings = useSettingsStore.getState();
  const mascot = useMascotStore.getState();
  if (!settings.showMascot || mascot.hidden) return;
  if (document.hidden) return;
  if (isTyping() && !opts.force) return;
  const now = Date.now();
  if (!opts.force && now - lastSpokenAt < (opts.cooldown ?? COOLDOWN)) return;
  const joke = pickJoke(category);
  if (!joke) return;
  lastSpokenAt = now;
  mascot.enqueue(joke.text, joke.expression);
  beep();
};

export const speakGreeting = () => {
  const hour = new Date().getHours();
  const cat: JokeCategory =
    hour < 11 ? 'greet.morning' : hour < 15 ? 'greet.afternoon' : hour < 19 ? 'greet.evening' : 'greet.night';
  speakJoke(cat, { force: true });
};

export const speakOpen = (app: string) => {
  const cat = `open.${app}` as JokeCategory;
  if (JOKES[cat]) speakJoke(cat, { cooldown: 3000 });
};
