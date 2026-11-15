import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMascotStore, Expression } from '../../store/mascotStore';
import { useSettingsStore } from '../../store/settingsStore';
import { speakJoke } from '../../lib/humor';
import { useLiteMode } from '../../lib/useLiteMode';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { MASCOT_SHEET_URL, MASCOT_SHEET_FRAMES, MASCOT_SPRITE_SIZE } from './mascotSprite';

type AnimState =
  | 'idle'
  | 'walk'
  | 'drag'
  | 'fall'
  | 'jump'
  | 'sit'
  | 'sleep'
  | 'wave'
  | 'dizzy'
  | 'hidden';

const SHEET_W = MASCOT_SPRITE_SIZE * MASCOT_SHEET_FRAMES;

/* ----------------------------- face overlay ----------------------------- */
const Face: React.FC<{ expr: Expression }> = ({ expr }) => {
  let eyes: React.ReactNode;
  let mouth: React.ReactNode = null;

  const e = (x1: number, x2: number, y = 11, w = 4, h = 5) => (
    <>
      <rect x={x1} y={y} width={w} height={h} fill="#FFFFFF" />
      <rect x={x2} y={y} width={w} height={h} fill="#FFFFFF" />
      <rect x={x1} y={y} width={w} height={1} fill="#FEBA8B" />
      <rect x={x2} y={y} width={w} height={1} fill="#FEBA8B" />
    </>
  );

  switch (expr) {
    case 'happy':
      eyes = (
        <>
          <rect x={10} y={13} width={4} height={1} fill="#FFFFFF" />
          <rect x={18} y={13} width={4} height={1} fill="#FFFFFF" />
          <rect x={10} y={12} width={1} height={1} fill="#FFFFFF" />
          <rect x={13} y={12} width={1} height={1} fill="#FFFFFF" />
          <rect x={18} y={12} width={1} height={1} fill="#FFFFFF" />
          <rect x={21} y={12} width={1} height={1} fill="#FFFFFF" />
        </>
      );
      mouth = <rect x={14} y={16} width={4} height={1} fill="#FD796C" />;
      break;
    case 'laugh':
      eyes = (
        <>
          <path d="M10 14 L12 11 L14 14" stroke="#FFFFFF" strokeWidth={1} fill="none" />
          <path d="M18 14 L20 11 L22 14" stroke="#FFFFFF" strokeWidth={1} fill="none" />
        </>
      );
      mouth = (
        <>
          <rect x={13} y={16} width={6} height={2} fill="#FD796C" />
          <rect x={14} y={18} width={4} height={1} fill="#FFFFFF" />
        </>
      );
      break;
    case 'wink':
      eyes = (
        <>
          {e(10, 18)}
          <rect x={18} y={13} width={4} height={1} fill="#FFFFFF" />
        </>
      );
      mouth = <rect x={14} y={16} width={4} height={1} fill="#FD796C" />;
      break;
    case 'surprised':
      eyes = (
        <>
          <rect x={9} y={10} width={5} height={6} fill="#FFFFFF" />
          <rect x={18} y={10} width={5} height={6} fill="#FFFFFF" />
          <rect x={10} y={12} width={2} height={2} fill="#2E2F31" />
          <rect x={19} y={12} width={2} height={2} fill="#2E2F31" />
        </>
      );
      mouth = <rect x={14} y={16} width={3} height={2} fill="#FD796C" />;
      break;
    case 'sad':
      eyes = (
        <>
          {e(10, 18, 12)}
          <rect x={11} y={16} width={1} height={2} fill="#7AA2F7" />
        </>
      );
      mouth = (
        <>
          <rect x={14} y={17} width={4} height={1} fill="#FD796C" />
          <rect x={13} y={16} width={1} height={1} fill="#FD796C" />
          <rect x={18} y={16} width={1} height={1} fill="#FD796C" />
        </>
      );
      break;
    case 'angry':
      eyes = (
        <>
          <rect x={10} y={13} width={4} height={2} fill="#FFFFFF" />
          <rect x={18} y={13} width={4} height={2} fill="#FFFFFF" />
          <rect x={9} y={11} width={5} height={1} fill="#CA6155" />
          <rect x={18} y={11} width={5} height={1} fill="#CA6155" />
        </>
      );
      mouth = <rect x={13} y={17} width={6} height={1} fill="#FFFFFF" />;
      break;
    case 'smug':
      eyes = (
        <>
          <rect x={10} y={13} width={4} height={2} fill="#FFFFFF" />
          <rect x={18} y={11} width={4} height={5} fill="#FFFFFF" />
        </>
      );
      mouth = (
        <>
          <rect x={14} y={17} width={4} height={1} fill="#FD796C" />
          <rect x={18} y={16} width={1} height={1} fill="#FD796C" />
        </>
      );
      break;
    case 'love':
      eyes = (
        <>
          <path d="M12 10 L10 12 L12 15 L14 12 Z" fill="#FF8FA3" />
          <path d="M20 10 L18 12 L20 15 L22 12 Z" fill="#FF8FA3" />
        </>
      );
      mouth = <rect x={14} y={16} width={4} height={1} fill="#FD796C" />;
      break;
    case 'thinking':
      eyes = (
        <>
          {e(10, 18)}
          <rect x={11} y={11} width={2} height={3} fill="#2E2F31" />
          <rect x={19} y={11} width={2} height={3} fill="#2E2F31" />
        </>
      );
      mouth = <rect x={15} y={17} width={2} height={1} fill="#FD796C" />;
      break;
    case 'sleepy':
      eyes = (
        <>
          <rect x={10} y={13} width={4} height={1} fill="#FFFFFF" />
          <rect x={18} y={13} width={4} height={1} fill="#FFFFFF" />
        </>
      );
      mouth = <rect x={14} y={17} width={3} height={1} fill="#FD796C" />;
      break;
    case 'dizzy':
      eyes = (
        <>
          <path d="M10 11 L14 15 M14 11 L10 15" stroke="#FFFFFF" strokeWidth={1} />
          <path d="M18 11 L22 15 M22 11 L18 15" stroke="#FFFFFF" strokeWidth={1} />
        </>
      );
      mouth = <rect x={13} y={17} width={6} height={1} fill="#FFFFFF" />;
      break;
    case 'blush':
      eyes = e(10, 18);
      mouth = <rect x={14} y={16} width={4} height={1} fill="#FD796C" />;
      break;
    case 'glitch':
      eyes = (
        <>
          <rect x={10} y={11} width={3} height={5} fill="#7BD88F" />
          <rect x={19} y={11} width={3} height={5} fill="#7BD88F" />
        </>
      );
      mouth = <rect x={12} y={17} width={8} height={1} fill="#7BD88F" />;
      break;
    case 'neutral':
    default:
      eyes = e(10, 18);
      break;
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ imageRendering: 'pixelated' }}
      aria-hidden
    >
      {eyes}
      {mouth}
      {(expr === 'blush' || expr === 'love') && (
        <>
          <rect x={7} y={15} width={2} height={1} fill="#FF8FA3" opacity={0.8} />
          <rect x={23} y={15} width={2} height={1} fill="#FF8FA3" opacity={0.8} />
        </>
      )}
    </svg>
  );
};

/* ------------------------------- bubble -------------------------------- */
const Bubble: React.FC<{ text: string; flip: 'left' | 'right' | 'center' }> = ({ text, flip }) => {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    setTyped('');
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [text]);

  const side =
    flip === 'left'
      ? 'right-0 translate-x-0'
      : flip === 'right'
        ? 'left-0 translate-x-0'
        : 'left-1/2 -translate-x-1/2';

  return (
    <div
      className={`absolute bottom-full mb-3 max-w-[min(240px,70vw)] px-3 py-2 text-[10px] leading-snug font-pixel text-white ${side}`}
      style={{
        background: 'rgba(20,19,23,0.92)',
        border: '2px solid #FD796C',
        borderRadius: 6,
        boxShadow: '3px 3px 0 rgba(30,31,33,0.8)',
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none',
      }}
      role="status"
      aria-live="polite"
    >
      {typed}
      <span className="animate-pulse">_</span>
      <div
        className="absolute top-full h-2 w-2 rotate-45"
        style={{
          background: '#FD796C',
          left: flip === 'left' ? 'auto' : '24px',
          right: flip === 'left' ? '24px' : 'auto',
          marginTop: -5,
        }}
      />
    </div>
  );
};

/* -------------------------------- mascot ------------------------------- */
const Mascot: React.FC = () => {
  const current = useMascotStore((s) => s.current);
  const next = useMascotStore((s) => s.next);
  const expression = useMascotStore((s) => s.expression);
  const setExpression = useMascotStore((s) => s.setExpression);
  const hiddenSetting = useSettingsStore((s) => s.showMascot);
  const lite = useLiteMode();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const size = isMobile ? 34 : 46;

  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<AnimState>('idle');
  const [state, setState] = useState<AnimState>('idle');
  const [facing, setFacing] = useState(1);
  const [bubbleSide, setBubbleSide] = useState<'left' | 'right' | 'center'>('center');
  const posRef = useRef({ x: 0, y: 0, baseY: 0 });
  const rafRef = useRef<number | null>(null);
  const lastInteraction = useRef(Date.now());
  const pointer = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const clicks = useRef<{ count: number; timer: number | null }>({ count: 0, timer: null });
  const hiddenLocal = useRef(false);
  const [, forceRender] = useState(0);

  const setS = useCallback((s: AnimState) => {
    stateRef.current = s;
    setState(s);
  }, []);

  const applyTransform = useCallback(() => {
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }
    if (spriteRef.current) {
      spriteRef.current.style.transform = `scaleX(${facing})`;
    }
  }, [facing]);

  const cancelRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const baseline = () => {
    const dock = document.querySelector('[role="toolbar"]') as HTMLElement | null;
    if (dock) return dock.getBoundingClientRect().top - size - 6;
    return window.innerHeight - 96;
  };

  const clampX = (x: number) => Math.min(Math.max(6, x), window.innerWidth - size - 6);

  /* init position */
  useEffect(() => {
    posRef.current.baseY = baseline();
    posRef.current.x = window.innerWidth / 2 - size / 2;
    posRef.current.y = posRef.current.baseY;
    applyTransform();
    const onResize = () => {
      posRef.current.baseY = baseline();
      posRef.current.x = clampX(posRef.current.x);
      if (stateRef.current === 'idle' || stateRef.current === 'sit' || stateRef.current === 'sleep') {
        posRef.current.y = posRef.current.baseY;
      }
      applyTransform();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  /* keep facing transform in sync */
  useEffect(() => {
    applyTransform();
  }, [facing, applyTransform]);

  /* speech ttl */
  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => next(), current.ttl ?? 4000);
    return () => clearTimeout(t);
  }, [current, next]);

  /* bubble side depends on position */
  useEffect(() => {
    if (!current) return;
    const x = posRef.current.x + size / 2;
    if (x < 150) setBubbleSide('right');
    else if (x > window.innerWidth - 150) setBubbleSide('left');
    else setBubbleSide('center');
  }, [current, size]);

  /* pause CSS animations when tab is hidden */
  const [docHidden, setDocHidden] = useState(false);
  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const walkTo = useCallback(
    (targetX: number, done?: () => void) => {
      if (hiddenLocal.current) return;
      cancelRaf();
      setS('walk');
      const startX = posRef.current.x;
      const dist = targetX - startX;
      if (Math.abs(dist) < 2) {
        setS('idle');
        return;
      }
      setFacing(dist > 0 ? 1 : -1);
      const speed = lite ? 42 : 70; // px per second
      const duration = Math.max(240, (Math.abs(dist) / speed) * 1000);
      const t0 = performance.now();
      const step = (now: number) => {
        if (document.hidden) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }
        const t = Math.min(1, (now - t0) / duration);
        posRef.current.x = startX + dist * t;
        if (wrapRef.current) {
          wrapRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
        if (spriteRef.current) spriteRef.current.style.transform = `scaleX(${dist > 0 ? 1 : -1})`;
        if (t < 1) rafRef.current = requestAnimationFrame(step);
        else {
          rafRef.current = null;
          setS('idle');
          done?.();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [lite, setS],
  );

  const jump = useCallback(() => {
    if (hiddenLocal.current) return;
    cancelRaf();
    setS('jump');
    const startY = posRef.current.baseY;
    const height = lite ? 22 : 34;
    const duration = 620;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const y = startY - Math.sin(t * Math.PI) * height;
      posRef.current.y = y;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${posRef.current.x}px, ${y}px, 0)`;
      }
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else {
        posRef.current.y = startY;
        setS('idle');
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [lite, setS]);

  /* idle scheduler */
  useEffect(() => {
    if (state !== 'idle' || hiddenLocal.current) return;
    const wait = lite ? 9000 : 4500 + Math.random() * 6000;
    const t = setTimeout(() => {
      if (document.hidden || stateRef.current !== 'idle' || hiddenLocal.current) return;
      lastInteraction.current = Date.now();
      const r = Math.random();
      if (r < 0.2) {
        setS('sit');
        setExpression('sleepy');
        setTimeout(() => {
          if (stateRef.current === 'sit') {
            setExpression('neutral');
            setS('idle');
          }
        }, 2600);
      } else if (r < 0.3) {
        setS('wave');
        setExpression('happy');
        speakJoke('idle', { cooldown: 0 });
        setTimeout(() => {
          if (stateRef.current === 'wave') {
            setExpression('neutral');
            setS('idle');
          }
        }, 1800);
      } else if (r < 0.4) {
        jump();
      } else {
        const x = clampX(Math.random() * (window.innerWidth - size));
        walkTo(x);
      }
    }, wait);
    return () => clearTimeout(t);
  }, [state, lite, size, jump, walkTo, setExpression, setS]);

  /* sleep after long idle */
  useEffect(() => {
    const t = setInterval(() => {
      if (document.hidden) return;
      if (stateRef.current === 'idle' && Date.now() - lastInteraction.current > 40000) {
        setS('sleep');
        setExpression('sleepy');
      }
    }, 5000);
    return () => clearInterval(t);
  }, [setExpression, setS]);

  /* wake on any interaction */
  const wake = () => {
    lastInteraction.current = Date.now();
    if (stateRef.current === 'sleep') {
      setExpression('neutral');
      setS('idle');
    }
  };

  /* pointer drag */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (hiddenLocal.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointer.current = {
      id: e.pointerId,
      sx: e.clientX,
      sy: e.clientY,
      ox: posRef.current.x,
      oy: posRef.current.y,
      moved: false,
    };
    cancelRaf();
    setS('drag');
    setExpression('surprised');
    wake();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.sx;
    const dy = e.clientY - p.sy;
    if (Math.abs(dx) + Math.abs(dy) > 5) p.moved = true;
    posRef.current.x = p.ox + dx;
    posRef.current.y = p.oy + dy;
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    pointer.current = null;
    if (!p.moved) {
      registerClick();
      setS('idle');
      setExpression('neutral');
      return;
    }
    speakJoke('drag', { cooldown: 0 });
    // fall back to the dock baseline
    cancelRaf();
    setS('fall');
    setExpression('surprised');
    const startY = posRef.current.y;
    const endY = baseline();
    const x = clampX(posRef.current.x);
    const t0 = performance.now();
    const duration = 520;
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const ease = t * t; // gravity-ish
      posRef.current.x = posRef.current.x + (x - posRef.current.x) * 0.15;
      posRef.current.y = startY + (endY - startY) * ease;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else {
        posRef.current.y = endY;
        posRef.current.baseY = endY;
        setS('dizzy');
        setExpression('dizzy');
        setTimeout(() => {
          if (stateRef.current === 'dizzy') {
            setExpression('neutral');
            setS('idle');
          }
        }, 1600);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const registerClick = () => {
    const c = clicks.current;
    if (c.timer) window.clearTimeout(c.timer);
    c.count += 1;
    c.timer = window.setTimeout(() => {
      if (c.count === 1) speakJoke('click.1', { cooldown: 0 });
      else if (c.count >= 3 && c.count < 7) speakJoke('click.3', { cooldown: 0 });
      else if (c.count >= 7) {
        speakJoke('click.7', { force: true });
        hideAngry();
      }
      c.count = 0;
      c.timer = null;
    }, 380);
  };

  const hideAngry = () => {
    hiddenLocal.current = true;
    cancelRaf();
    setS('hidden');
    setExpression('angry');
    setTimeout(() => {
      hiddenLocal.current = false;
      setS('dizzy');
      setExpression('dizzy');
      forceRender((n) => n + 1);
      lastInteraction.current = Date.now();
      setTimeout(() => {
        if (stateRef.current === 'dizzy') {
          setExpression('neutral');
          setS('idle');
        }
      }, 2200);
    }, 3200);
  };

  /* bubble should not be flipped with sprite; sprite transform is separate */

  if (!hiddenSetting) return null;

  const flipForBubble = bubbleSide;

  /* frame background-position via state classes:
     idle frames 0-1, walk 2-3, wave 4, dizzy 5 */
  let spriteClass = 'mascot-sprite';
  if (state === 'walk') spriteClass += ' anim-walk';
  else if (state === 'idle' || state === 'sleep' || state === 'sit') spriteClass += ' anim-idle';
  else if (state === 'wave') spriteClass += ' frame-wave';
  else if (state === 'dizzy' || state === 'drag') spriteClass += ' frame-dizzy';

  return (
    <div ref={wrapRef} className="pointer-events-none fixed left-0 top-0 z-[45]" style={{ width: 0, height: 0 }}>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="pointer-events-auto relative cursor-grab select-none active:cursor-grabbing"
        style={{
          width: size,
          height: size,
          opacity: state === 'hidden' ? 0 : 1,
          transform: state === 'hidden' ? 'scale(0.4)' : 'scale(1)',
          transition: 'opacity .2s, transform .2s',
          touchAction: 'none',
        }}
      >
        {current && <Bubble text={current.text} flip={flipForBubble} />}
        {state === 'sleep' && (
          <div className="absolute -top-4 right-0 select-none font-pixel text-[10px] text-peach animate-pulse">
            Z<span className="inline-block translate-x-1 -translate-y-2">z</span>
            <span className="inline-block translate-x-2 -translate-y-4">z</span>
          </div>
        )}

        <div
          ref={spriteRef}
          className={spriteClass}
          style={{
            width: size,
            height: size,
            backgroundImage: `url("${MASCOT_SHEET_URL}")`,
            backgroundSize: `${SHEET_W * (size / MASCOT_SPRITE_SIZE)}px ${size}px`,
            imageRendering: 'pixelated',
            ['--fw' as string]: `${size}px`,
            transform: `scaleX(${facing})`,
            animationPlayState: docHidden ? 'paused' : 'running',
          }}
          role="img"
          aria-label={`Maskot PIXEL, ekspresi ${expression}`}
        >
          <Face expr={expression} />
        </div>
      </div>
    </div>
  );
};

export default Mascot;
