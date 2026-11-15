import React, { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { useOSStore, AppId } from '../../store/osStore';
import { useSettingsStore } from '../../store/settingsStore';
import { APP_IDS, APPS } from '../../os/apps';
import { useLiteMode } from '../../lib/useLiteMode';
import { speakGreeting, speakJoke, speakOpen } from '../../lib/humor';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowFrame from './WindowFrame';
import Wallpaper from './Wallpaper';
import DesktopIcons from './DesktopIcons';
import Mascot from '../mascot/Mascot';

const Desktop: React.FC<{ location: string }> = ({ location }) => {
  const [, navigate] = useLocation();
  const focusedId = useOSStore((s) => s.focusedId);
  const windows = useOSStore((s) => s.windows);
  const openApp = useOSStore((s) => s.openApp);
  const focusApp = useOSStore((s) => s.focusApp);
  const settings = useSettingsStore();
  const lite = useLiteMode();
  const lastNav = useRef<string>('');

  // Apply lite mode / theme to root element for CSS variables
  useEffect(() => {
    document.documentElement.classList.toggle('lite', lite);
  }, [lite]);

  // Always open About when the desktop has no windows (fresh entry / reload).
  useEffect(() => {
    const timer = setTimeout(() => {
      const state = useOSStore.getState();
      if (Object.keys(state.windows).length === 0) {
        state.openApp('about');
      }
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Greeting + return-tab joke
  useEffect(() => {
    speakGreeting();
    const onVis = () => {
      if (!document.hidden) {
        speakJoke('returnTab', { cooldown: 20000 });
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Route → open/focus app
  useEffect(() => {
    const path = location.replace(/^\/|\/$/g, '');
    const app = APP_IDS.find((id) => id === path);
    if (app) {
      if (!windows[app]) {
        openApp(app);
        speakOpen(app);
      } else if (windows[app].minimized) {
        focusApp(app);
      }
    }
    lastNav.current = location;
  }, [location, windows]);

  // If focused window closed, navigate to next focused or root
  useEffect(() => {
    const path = location.replace(/^\/|\/$/g, '');
    if (!path) return;
    if (!windows[path]) navigate('/');
  }, [focusedId, location, windows]);

  // Global Esc to close focused window (only outside inputs)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || (el as HTMLElement).isContentEditable)) return;
      if (focusedId) {
        useOSStore.getState().closeApp(focusedId);
        if (location.replace(/^\//, '') === focusedId) navigate('/');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focusedId]);

  // Idle joke loop (frequency setting)
  useEffect(() => {
    if (settings.jokeFrequency === 'off') return;
    const base = settings.jokeFrequency === 'rare' ? 60000 : settings.jokeFrequency === 'often' ? 14000 : 30000;
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      const wait = base + Math.random() * base * 0.7;
      timer = setTimeout(() => {
        speakJoke('idle', { cooldown: 0 });
        loop();
      }, wait);
    };
    loop();
    return () => clearTimeout(timer);
  }, [settings.jokeFrequency]);

  // Konami code easter egg
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[idx]) {
        idx++;
        if (idx === seq.length) {
          speakJoke('konami', { force: true });
          idx = 0;
        }
      } else {
        idx = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Wallpaper id={settings.wallpaper} />

      <MenuBar />
      <DesktopIcons onOpen={(id) => navigate(`/${id}`)} />
      <WindowManager />
      <Dock />
      {settings.showMascot && <Mascot />}
    </div>
  );
};

const WindowManager: React.FC = () => {
  const windows = useOSStore((s) => s.windows);
  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 20 }}>
      {Object.values(windows)
        .filter((w) => !w.minimized)
        .sort((a, b) => a.z - b.z)
        .map((w) => (
          <div key={w.id} className="pointer-events-none" style={{ position: 'absolute', inset: 0 }}>
            <WindowFrame id={w.id as AppId} />
          </div>
        ))}
    </div>
  );
};

export default Desktop;
