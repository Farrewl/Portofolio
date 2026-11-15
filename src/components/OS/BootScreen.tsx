import React, { useState, useEffect, useCallback } from 'react';

const logs = [
  "[ OK ] Initializing core...",
  "[ OK ] Loading pixel assets...",
  "[ OK ] Calibrating mascot sensors...",
  "[ OK ] Brewing coffee...",
  "[ OK ] Cleaning up bugs (mostly)...",
  "[ OK ] Starting Portfolio OS...",
];

/** Pixel-art robot head that peeks from behind the title. */
const PeekRobot: React.FC = () => (
  <div
    className="boot-robot absolute left-1/2 z-0"
    style={{
      width: 'clamp(46px, 9vw, 76px)',
      top: 'calc(clamp(46px, 9vw, 76px) * -0.62)',
      height: 'auto',
    }}
    aria-hidden
  >
    <svg viewBox="0 0 32 28" width="100%" height="100%" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
      {/* antennas */}
      <rect x="9" y="3" width="1" height="6" fill="#1E1F21" />
      <rect x="8" y="1" width="3" height="3" fill="#1E1F21" />
      <rect x="8" y="1" width="1" height="1" fill="#444547" />
      <rect x="22" y="3" width="1" height="6" fill="#1E1F21" />
      <rect x="21" y="1" width="3" height="3" fill="#1E1F21" />
      <rect x="21" y="1" width="1" height="1" fill="#444547" />

      {/* earpieces */}
      <rect x="3" y="15" width="2" height="7" fill="#1E1F21" />
      <rect x="27" y="15" width="2" height="7" fill="#1E1F21" />
      <rect x="4" y="16" width="1" height="5" fill="#444547" />
      <rect x="27" y="16" width="1" height="5" fill="#444547" />

      {/* head shell (stepped pixel corners) */}
      <rect x="7" y="8" width="18" height="2" fill="#1E1F21" />
      <rect x="5" y="10" width="22" height="13" fill="#1E1F21" />
      <rect x="6" y="23" width="20" height="2" fill="#1E1F21" />
      <rect x="8" y="9" width="16" height="1" fill="#FD796C" />
      <rect x="6" y="10" width="20" height="13" fill="#FD796C" />
      <rect x="7" y="23" width="18" height="1" fill="#FD796C" />

      {/* peach highlights */}
      <rect x="8" y="10" width="5" height="2" fill="#FEBA8B" />
      <rect x="7" y="12" width="2" height="6" fill="#FEBA8B" />
      <rect x="8" y="13" width="1" height="4" fill="#CA6155" />
      <rect x="24" y="21" width="2" height="2" fill="#CA6155" />

      {/* visor */}
      <rect x="9" y="12" width="14" height="1" fill="#2E2F31" />
      <rect x="8" y="13" width="16" height="7" fill="#2E2F31" />
      <rect x="9" y="20" width="14" height="1" fill="#2E2F31" />

      {/* eyes (blink via CSS) */}
      <g className="boot-eye">
        <rect x="11" y="14" width="4" height="5" fill="#FFFFFF" />
        <rect x="17" y="14" width="4" height="5" fill="#FFFFFF" />
        <rect x="11" y="18" width="4" height="1" fill="#FEBA8B" />
        <rect x="17" y="18" width="4" height="1" fill="#FEBA8B" />
      </g>

      {/* little smile */}
      <rect x="14" y="19" width="4" height="1" fill="#FD796C" />
      <rect x="13" y="18" width="1" height="1" fill="#FD796C" />
      <rect x="18" y="18" width="1" height="1" fill="#FD796C" />
    </svg>
  </div>
);

const BootScreen: React.FC<{ setBooted: (v: boolean) => void }> = ({ setBooted }) => {
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const finish = useCallback(() => {
    sessionStorage.setItem('portfolio-booted', 'true');
    setBooted(true);
  }, [setBooted]);

  useEffect(() => {
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < logs.length) {
        setCurrentLogs((prev) => [...prev, logs[logIdx]]);
        logIdx++;
        setProgress(Math.round((logIdx / logs.length) * 100));
      } else {
        clearInterval(logInterval);
        setTimeout(finish, 700);
      }
    }, 380);

    return () => clearInterval(logInterval);
  }, [finish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black p-4">
      {/* subtle pixel grid */}
      <div className="boot-grid pointer-events-none absolute inset-0 opacity-[0.16]" aria-hidden />

      <div className="relative z-10 w-full max-w-lg">
        {/* title + peeking robot */}
        <div className="relative mb-10 mt-8 text-center sm:mb-14">
          <PeekRobot />
          <h1
            className="relative z-10 inline-block bg-black px-3 py-2 font-pixel leading-none text-coral sm:px-5"
            style={{
              fontSize: 'clamp(1.5rem, 7.2vw, 3.6rem)',
              letterSpacing: 'clamp(0.16em, 1.4vw, 0.3em)',
              textShadow: '4px 4px 0 rgba(202,97,85,0.35)',
            }}
          >
            PORTOFOLIO
          </h1>
          <div className="mt-3 font-pixel text-[8px] uppercase tracking-[0.35em] text-white/40 sm:text-[10px]">
            pixel portfolio os · v1.0
          </div>
        </div>

        {/* terminal log */}
        <div
          className="mb-5 h-40 overflow-hidden border border-white/10 px-3 py-2 font-mono text-[10px] leading-relaxed text-[#7BD88F] sm:text-xs"
          style={{ background: 'rgba(253,121,108,0.035)' }}
          aria-live="polite"
        >
          {currentLogs.map((log, i) => (
            <div key={i} className="mb-0.5 whitespace-nowrap">
              {log}
            </div>
          ))}
          <span className="animate-pulse">_</span>
        </div>

        {/* pixel progress bar */}
        <div className="h-4 w-full border-2 border-white/15 p-0.5" style={{ background: '#141317' }}>
          <div
            className="h-full transition-[width] duration-300"
            style={{
              width: `${progress}%`,
              backgroundImage:
                'repeating-linear-gradient(90deg,#FD796C 0 6px,#CA6155 6px 8px,#FD796C 8px 14px)',
              backgroundSize: '14px 100%',
            }}
          />
        </div>
        <div className="mt-2 flex justify-between font-pixel text-[9px] text-white/40 sm:text-[10px]">
          <span>LOADING...</span>
          <span>{progress}%</span>
        </div>
      </div>

      <button
        onClick={finish}
        className="absolute bottom-6 right-4 z-20 border border-white/10 bg-white/5 px-3 py-2 font-pixel text-[9px] text-white/50 transition-colors hover:border-coral/40 hover:text-white sm:bottom-8 sm:right-8 sm:text-[10px]"
      >
        [ ESC ] SKIP BOOT
      </button>
    </div>
  );
};

export default BootScreen;
