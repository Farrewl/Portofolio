import React from 'react';
import { m } from 'framer-motion';
import { APPS, APP_IDS } from '../../os/apps';
import { AppId } from '../../store/osStore';
import { AppIcon } from './PixelIcons';

const DesktopIcons: React.FC<{ onOpen: (id: AppId) => void }> = ({ onOpen }) => {
  return (
    <div
      className="absolute left-0 right-0 top-11 z-10 grid grid-cols-4 justify-items-center gap-3 p-3 sm:p-4 md:left-4 md:right-auto md:top-12 md:flex md:flex-col md:items-center md:gap-3 md:p-0"
      aria-label="Desktop shortcuts"
    >
      {APP_IDS.map((id, i) => (
        <m.button
          key={id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 + i * 0.06, duration: 0.25 }}
          onClick={() => onOpen(id)}
          className="flex flex-col items-center gap-1 w-16 group focus:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-lg p-1"
          aria-label={`Open ${APPS[id].title}`}
        >
          <span className="transition-transform duration-150 group-hover:scale-110 group-active:scale-95">
            <AppIcon name={APPS[id].icon} size={40} />
          </span>
          <span className="text-[8px] font-pixel text-white/90 text-center leading-tight px-1 py-0.5 rounded group-hover:bg-coral/40 max-w-[64px] truncate">
            {APPS[id].title}
          </span>
        </m.button>
      ))}
    </div>
  );
};

export default DesktopIcons;
