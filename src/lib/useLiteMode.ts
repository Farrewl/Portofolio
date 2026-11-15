import { useEffect, useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export const detectLite = () => {
  if (typeof window === 'undefined') return false;
  const setting = useSettingsStore.getState().performance;
  if (setting === 'lite') return true;
  if (setting === 'high') return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weak =
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
  const small = window.innerWidth < 640;
  return reduced || weak || small;
};

export const useLiteMode = () => {
  const [lite, setLite] = useState(detectLite);
  useEffect(() => {
    const update = () => setLite(detectLite());
    update();
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return lite;
};
