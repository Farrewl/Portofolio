import React, { useMemo } from 'react';
import type { WallpaperId } from '../../store/settingsStore';

// Deterministic pseudo-random (mulberry32) so wallpaper is stable across renders.
const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

interface Palette {
  skyTop: string;
  skyBottom: string;
  star: string;
  moon: string;
  cityFar: string;
  cityNear: string;
  windowLit: string;
  dither: string;
  accent: string;
}

const PALETTES: Record<WallpaperId, Palette> = {
  'city-night': {
    skyTop: '#0B0C14',
    skyBottom: '#1B1F33',
    star: '#FEBA8B',
    moon: '#FD796C',
    cityFar: '#232637',
    cityNear: '#161824',
    windowLit: '#FD796C',
    dither: '#444547',
    accent: '#FD796C',
  },
  sunset: {
    skyTop: '#2E1A3C',
    skyBottom: '#FD796C',
    star: '#FFFFFF',
    moon: '#FEBA8B',
    cityFar: '#3A2440',
    cityNear: '#241628',
    windowLit: '#FEBA8B',
    dither: '#CA6155',
    accent: '#CA6155',
  },
  matrix: {
    skyTop: '#030906',
    skyBottom: '#0A1F12',
    star: '#7BD88F',
    moon: '#7BD88F',
    cityFar: '#0D2417',
    cityNear: '#08150D',
    windowLit: '#7BD88F',
    dither: '#1E4D2E',
    accent: '#7BD88F',
  },
  aurora: {
    skyTop: '#070C1B',
    skyBottom: '#12223E',
    star: '#FEBA8B',
    moon: '#7AA2F7',
    cityFar: '#16233C',
    cityNear: '#0E1726',
    windowLit: '#7AA2F7',
    dither: '#3A4E78',
    accent: '#7AA2F7',
  },
};

const Wallpaper: React.FC<{ id: WallpaperId }> = ({ id }) => {
  const p = PALETTES[id];
  const rand = useMemo(() => mulberry32(id.length * 7919 + 17), [id]);

  const stars = useMemo(() => {
    const arr: { x: number; y: number; s: number }[] = [];
    const n = id === 'city-night' ? 90 : id === 'aurora' ? 110 : 60;
    for (let i = 0; i < n; i++) {
      arr.push({
        x: Math.floor(rand() * 320),
        y: Math.floor(rand() * 110),
        s: rand() > 0.85 ? 2 : 1,
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const buildings = useMemo(() => {
    const far: { x: number; w: number; h: number }[] = [];
    const near: { x: number; w: number; h: number }[] = [];
    let x = 0;
    while (x < 320) {
      const w = 12 + Math.floor(rand() * 22);
      const h = 30 + Math.floor(rand() * 45);
      far.push({ x, w, h });
      x += w + 2;
    }
    x = 0;
    while (x < 320) {
      const w = 18 + Math.floor(rand() * 26);
      const h = 20 + Math.floor(rand() * 30);
      near.push({ x, w, h });
      x += w + 3;
    }
    return { far, near };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const windows = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (const b of buildings.near) {
      const cols = Math.floor(b.w / 5);
      const rows = Math.floor(b.h / 6);
      for (let c = 1; c < cols; c++) {
        for (let r = 1; r < rows; r++) {
          if (rand() > 0.72) arr.push({ x: b.x + c * 5, y: 180 - b.h + r * 6 + 1 });
        }
      }
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, buildings]);

  const dithers = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let y = 0; y < 18; y++) {
      for (let x = 0; x < 320; x += 4) {
        if ((x + y) % 8 < 4) arr.push({ x: x + ((x + y) % 4), y: 162 + y });
      }
    }
    return arr;
  }, []);

  const defs = (
    <defs>
      <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={p.skyTop} />
        <stop offset="100%" stopColor={p.skyBottom} />
      </linearGradient>
    </defs>
  );

  const core = (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      shapeRendering="crispEdges"
      aria-hidden
    >
      {defs}
      <rect width="320" height="180" fill={`url(#sky-${id})`} />

      {/* stars */}
      {stars.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.s} height={s.s} fill={p.star} opacity={0.8} />
      ))}

      {/* moon / sun */}
      <rect x={252} y={26} width={26} height={26} fill={p.moon} opacity={0.9} />
      {id === 'city-night' && <rect x={246} y={22} width={4} height={4} fill={p.skyTop} />}
      {id === 'city-night' && <rect x={260} y={14} width={3} height={3} fill={p.skyTop} />}

      {/* aurora bands */}
      {id === 'aurora' && (
        <>
          <rect x={0} y={40} width={320} height={3} fill={p.accent} opacity={0.25} />
          <rect x={40} y={34} width={200} height={2} fill={p.accent} opacity={0.35} />
          <rect x={120} y={28} width={160} height={2} fill={p.accent} opacity={0.3} />
        </>
      )}

      {/* matrix rain */}
      {id === 'matrix' &&
        Array.from({ length: 26 }).map((_, i) => (
          <rect
            key={i}
            x={i * 12 + 3}
            y={((i * 37) % 90) + 6}
            width={2}
            height={10 + (i % 5) * 8}
            fill={p.accent}
            opacity={0.35}
          />
        ))}

      {/* far city */}
      {buildings.far.map((b, i) => (
        <rect key={`f${i}`} x={b.x} y={180 - b.h - 30} width={b.w} height={b.h + 30} fill={p.cityFar} />
      ))}

      {/* near city */}
      {buildings.near.map((b, i) => (
        <g key={`n${i}`}>
          <rect x={b.x} y={180 - b.h} width={b.w} height={b.h} fill={p.cityNear} />
          <rect x={b.x + 1} y={180 - b.h - 2} width={b.w - 2} height={2} fill={p.cityNear} />
        </g>
      ))}

      {/* lit windows */}
      {windows.map((w, i) => (
        <rect key={`w${i}`} x={w.x} y={w.y} width={2} height={2} fill={p.windowLit} opacity={0.85} />
      ))}

      {/* dither transition */}
      {dithers.map((d, i) => (
        <rect key={`d${i}`} x={d.x} y={d.y} width={1} height={1} fill={p.dither} opacity={0.28} />
      ))}

      {/* ground */}
      <rect y={170} width={320} height={10} fill={p.cityNear} />
    </svg>
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${p.skyTop} 0%, ${p.skyBottom} 100%)` }}
      />
      <div className="absolute inset-0" style={{ isolation: 'isolate' }}>
        {core}
      </div>
      {/* vignette keeps foreground text legible over busy pixel art */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)',
        }}
      />
    </div>
  );
};

export default Wallpaper;
