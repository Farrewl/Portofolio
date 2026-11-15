import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import Wallpaper from './Wallpaper';
import { useSettingsStore } from '../../store/settingsStore';

const LoginScreen: React.FC<{ setEntered: (v: boolean) => void }> = ({ setEntered }) => {
  const [time, setTime] = useState(new Date());
  const wallpaper = useSettingsStore((s) => s.wallpaper);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <m.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center justify-center h-full w-full bg-black"
    >
      <Wallpaper id={wallpaper} />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="text-8xl font-bold mb-2 tracking-tighter">
          {formatTime(time)}
        </div>
        <div className="text-xl mb-16 opacity-80 uppercase tracking-widest font-pixel">
          {formatDate(time)}
        </div>

        <div className="group flex flex-col items-center cursor-pointer" onClick={() => setEntered(true)}>
          <div className="w-24 h-24 rounded-full border-2 border-white/20 p-1 mb-4 overflow-hidden group-hover:border-coral transition-colors">
            <div className="w-full h-full rounded-full bg-coral/20 flex items-center justify-center text-3xl overflow-hidden">
               {/* Pixel Avatar Placeholder */}
               <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                 <rect x="4" y="4" width="8" height="8" fill="#FD796C" />
                 <rect x="6" y="6" width="1" height="1" fill="#2E2F31" />
                 <rect x="9" y="6" width="1" height="1" fill="#2E2F31" />
                 <rect x="6" y="9" width="4" height="1" fill="#2E2F31" />
               </svg>
            </div>
          </div>
          <div className="font-pixel text-sm tracking-wide">Ibnu Farrel</div>
          <div className="mt-8 px-6 py-2 bg-white/10 hover:bg-coral/40 backdrop-blur border border-white/20 rounded-full transition-all text-[10px] font-pixel animate-pulse" onClick={() => setEntered(true)}>
            CLICK TO ENTER
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-[10px] opacity-30 font-pixel">
        PORTFOLIO OS v1.0
      </div>
    </m.div>
  );
};

export default LoginScreen;
