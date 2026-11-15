import React, { useRef, useState, Suspense } from 'react';
import { APPS } from '../../os/apps';
import { AppId, useOSStore } from '../../store/osStore';
import { speakJoke } from '../../lib/humor';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { m } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';

const WindowFrame = ({ id }: { id: AppId }) => {
  const meta = APPS[id];
  const win = useOSStore((s) => s.windows[id]);
  const focused = useOSStore((s) => s.focusedId === id);
  const focusApp = useOSStore((s) => s.focusApp);
  const minimizeApp = useOSStore((s) => s.minimizeApp);
  const closeApp = useOSStore((s) => s.closeApp);
  const toggleMaximize = useOSStore((s) => s.toggleMaximize);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const outerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 60, y: 60 });
  const size = useRef({ ...meta.size });
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const savedRect = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const [closing, setClosing] = useState(false);
  const [minimizing, setMinimizing] = useState(false);
  const [anim, setAnim] = useState({ opacity: 1, scale: 1 });

  if (!win) return null;

  const handleClose = () => {
    if (closing || win.minimized) return;
    setClosing(true);
    setAnim({ opacity: 0, scale: 0.94 });
    setTimeout(() => closeApp(id), 150);
  };

  const handleMinimize = () => {
    if (win.minimized) return;
    setMinimizing(true);
    setAnim({ opacity: 0, scale: 0.36 });
    setTimeout(() => minimizeApp(id), 170);
  };

  const handleToggleMaximize = () => {
    const next = !win.maximized;
    if (next && !win.maximized && !savedRect.current) {
      savedRect.current = { ...pos.current, ...size.current };
    }
    toggleMaximize(id);
    setAnim(next ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 });
  };

  const onTitlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (win.maximized || isMobile) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);
    const el = outerRef.current;
    if (!el) return;
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: pos.current.x, oy: pos.current.y };
    el.style.willChange = 'transform';
    const move = (ev: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const nx = Math.min(Math.max(0, ev.clientX - d.sx + d.ox), window.innerWidth - 120);
      const ny = Math.min(Math.max(0, ev.clientY - d.sy + d.oy), window.innerHeight - 120);
      pos.current = { x: nx, y: ny };
      el.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
    };
    const up = () => {
      dragRef.current = null;
      el.style.willChange = 'auto';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const startResize = (edges: string) => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (win.maximized || isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    focusApp(id);
    const el = outerRef.current;
    if (!el) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.current.w;
    const startH = size.current.h;
    const move = (ev: PointerEvent) => {
      let w = startW;
      let h = startH;
      if (edges.includes('e')) w = Math.max(420, startW + ev.clientX - startX);
      if (edges.includes('s')) h = Math.max(320, startH + ev.clientY - startY);
      if (edges.includes('w')) {
        const nw = Math.max(420, startW - (startX - ev.clientX));
        w = nw;
        el.style.transform = `translate3d(${pos.current.x + startW - nw}px, ${pos.current.y}px, 0)`;
      }
      if (edges.includes('n')) {
        h = Math.max(320, startH - (startY - ev.clientY));
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + startH - h}px, 0)`;
      }
      size.current = { w, h };
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const style: React.CSSProperties =
    win.maximized || isMobile
      ? {
          position: 'fixed',
          top: isMobile ? 36 : 36,
          left: isMobile ? 4 : 8,
          right: isMobile ? 4 : 8,
          bottom: isMobile ? 88 : 96,
          width: 'auto',
          height: 'auto',
          zIndex: win.z,
        }
      : {
          position: 'fixed',
          left: pos.current.x,
          top: pos.current.y,
          width: size.current.w,
          height: size.current.h,
          zIndex: win.z,
        };

  const AppComponent = meta.component;

  if (win.minimized) return null;

  return (
    <div
      ref={outerRef}
      className={`window-shell pointer-events-auto ${focused ? 'is-focused' : ''} rounded-xl overflow-hidden`}
      style={style}
      role="dialog"
      aria-label={meta.title}
      aria-modal="false"
      data-window-id={id}
      data-focused={focused}
    >
      <m.div
        className="absolute inset-0 flex flex-col"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={anim}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        style={{ borderRadius: 12, overflow: 'hidden' }}
      >
        <div
          onPointerDown={onTitlePointerDown}
          className="h-9 flex items-center justify-between px-3 select-none touch-none"
          style={{ background: focused ? 'rgba(253,121,108,0.12)' : 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="text-[10px] font-pixel text-white/70 tracking-wide">{meta.title}</div>
          <div className="flex items-center gap-1">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleMinimize}
              className="p-1 rounded hover:bg-white/10 text-white/70"
              aria-label={`Minimize ${meta.title}`}
            >
              <Minus size={12} />
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleToggleMaximize}
              className="p-1 rounded hover:bg-white/10 text-white/70"
              aria-label={`Maximize ${meta.title}`}
            >
              <Square size={10} />
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleClose}
              className="p-1 rounded hover:bg-white/10 text-white/70"
              aria-label={`Close ${meta.title}`}
            >
              <X size={12} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto">
            <Suspense fallback={<div className="p-4 font-pixel text-xs text-white/50 animate-pulse">LOADING...</div>}>
              <AppComponent />
            </Suspense>
          </div>
        </div>

        {!isMobile && (
          <>
            <div onPointerDown={startResize('e')} className="absolute top-9 bottom-0 right-0 w-2 cursor-col-resize" style={{ zIndex: 30 }} />
            <div onPointerDown={startResize('s')} className="absolute top-9 bottom-0 right-2 w-2 cursor-row-resize" style={{ zIndex: 30 }} />
            <div onPointerDown={startResize('se')} className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize" style={{ zIndex: 31 }} />
          </>
        )}
      </m.div>
    </div>
  );
};

export default WindowFrame;
