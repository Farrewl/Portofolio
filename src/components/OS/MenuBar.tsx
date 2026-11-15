import React from 'react';
import { useOSStore } from '../../store/osStore';
import { useSettingsStore } from '../../store/settingsStore';
import { AppIcon } from './PixelIcons';
import { Wifi, BatteryMedium, Volume2, VolumeX, RotateCw } from 'lucide-react';

const MenuBar = () => {
  const focusedId = useOSStore((s) => s.focusedId);
  const windows = useOSStore((s) => s.windows);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const sound = useSettingsStore((s) => s.sound);
  const setSound = useSettingsStore((s) => s.setSound);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const activeApp = focusedId ? windows[focusedId]?.id : null;
  const title = activeApp ? activeApp.toUpperCase() : 'FINDER';

  return (
    <div className="menubar-glass fixed top-0 left-0 right-0 z-50 flex h-8 select-none items-center justify-between px-3 text-[9px] font-pixel text-white/90 sm:px-4 sm:text-[10px]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded cursor-pointer">
          <AppIcon name="logo" size={14} />
          <span className="font-bold">IF.</span>
        </div>
        <div className="font-bold tracking-wider">{title}</div>
        <div className="hidden sm:flex gap-3 text-white/60">
          <button className="hover:text-white">File</button>
          <button className="hover:text-white">Edit</button>
          <button className="hover:text-white">View</button>
          <button className="hover:text-white">Help</button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setSound(!sound)} className="hover:text-coral transition-colors" title={sound ? 'Mute' : 'Unmute'}>
          {sound ? <Volume2 size={12} /> : <VolumeX size={12} />}
        </button>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-coral transition-colors text-[9px]">
          {theme === 'dark' ? '☾' : '☀'}
        </button>
        <Wifi size={12} className="text-white/70" />
        <BatteryMedium size={14} className="text-white/70" />
        <div className="flex items-center gap-1 text-white/80">
          <span>{time.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          <span>{time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
