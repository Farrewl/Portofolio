import React, { useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useOSStore, AppId } from '../../store/osStore';
import { AppIcon, IconName, iconLabel } from './PixelIcons';

const DOCK_APPS: { id: AppId; icon: IconName; label: string }[] = [
  { id: 'about', icon: 'about', label: 'About Me' },
  { id: 'projects', icon: 'projects', label: 'Projects' },
  { id: 'cv', icon: 'cv', label: 'CV' },
  { id: 'skills', icon: 'skills', label: 'Skills' },
  { id: 'contact', icon: 'contact', label: 'Contact' },
  { id: 'terminal', icon: 'terminal', label: 'Terminal' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
  { id: 'trash', icon: 'trash', label: 'Trash' },
];

const Dock = () => {
  const [, navigate] = useLocation();
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openApp = useOSStore((s) => s.openApp);
  const focusApp = useOSStore((s) => s.focusApp);
  const windows = useOSStore((s) => s.windows);
  const focusedId = useOSStore((s) => s.focusedId);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const dock = dockRef.current;
    if (!dock) return;
    const rect = dock.getBoundingClientRect();
    const mouseX = e.clientX;
    const icons = iconRefs.current.filter(Boolean) as HTMLButtonElement[];
    icons.forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      const center = iconRect.left + iconRect.width / 2;
      const dist = Math.abs(mouseX - center);
      const maxDist = 120;
      const scale = dist < maxDist ? 1 + (1 - dist / maxDist) * 0.5 : 1;
      const translateY = dist < maxDist ? -(dist / maxDist) * 16 : 0;
      icon.style.transform = `translateY(${translateY}px) scale(${scale})`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    iconRefs.current.forEach((icon) => {
      if (icon) icon.style.transform = 'translateY(0) scale(1)';
    });
  }, []);

  const handleClick = (id: AppId) => {
    navigate(`/${id}`);
    const win = windows[id];
    if (!win) {
      openApp(id);
    } else if (win.minimized) {
      focusApp(id);
    } else if (focusedId === id) {
      // Already focused, keep as is.
    } else {
      focusApp(id);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-2"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={dockRef}
        className="dock-glass flex max-w-full items-end gap-1 overflow-x-auto rounded-2xl px-3 py-2 sm:gap-1.5 sm:px-4"
        role="toolbar"
        aria-label="Application dock"
      >
        {DOCK_APPS.map((app, i) => {
          const win = windows[app.id];
          const isOpen = !!win && !win.minimized;
          const isMinimized = !!win && win.minimized;
          const isFocused = focusedId === app.id;
          return (
            <div key={app.id} className="flex flex-col items-center group relative">
              <button
                ref={(el) => {
                  iconRefs.current[i] = el;
                }}
                onClick={() => handleClick(app.id)}
                aria-label={app.label}
                className="relative transition-transform duration-200 ease-out will-change-transform"
                style={{ imageRendering: 'pixelated' }}
              >
                <AppIcon name={app.icon} size={40} className="drop-shadow-lg" />
                {isOpen && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-coral" />
                )}
              </button>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[9px] font-pixel bg-black/80 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {app.label}
              </span>
              {isMinimized && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/50" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
