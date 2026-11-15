import React from 'react';
import { useSettingsStore, WallpaperId, JokeFrequency } from '../../store/settingsStore';
import { useOSStore } from '../../store/osStore';
import { speakJoke } from '../../lib/humor';
import Wallpaper from '../OS/Wallpaper';
import { useLocation } from 'wouter';
import { RotateCw, ExternalLink } from 'lucide-react';

const WALLPAPERS: { id: WallpaperId; name: string }[] = [
  { id: 'city-night', name: 'Kota Malam' },
  { id: 'sunset', name: 'Senja' },
  { id: 'matrix', name: 'Matrix' },
  { id: 'aurora', name: 'Aurora' },
];

const FREQ: { id: JokeFrequency; name: string }[] = [
  { id: 'off', name: 'Mati' },
  { id: 'rare', name: 'Jarang' },
  { id: 'normal', name: 'Normal' },
  { id: 'often', name: 'Sering' },
];

const Settings: React.FC = () => {
  const settings = useSettingsStore();
  const restart = useOSStore((s) => s.restart);
  const [, navigate] = useLocation();

  const changeWallpaper = (w: WallpaperId) => {
    settings.setWallpaper(w);
    speakJoke('wallpaper', { force: true });
  };
  const changeTheme = (t: 'dark' | 'light') => {
    settings.setTheme(t);
    speakJoke('theme', { force: true });
  };

  const handleRestart = () => {
    sessionStorage.removeItem('portfolio-booted');
    sessionStorage.removeItem('portfolio-entered');
    restart();
    navigate('/');
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 text-white/90 font-sans space-y-5">
      <section>
        <h3 className="font-pixel text-coral text-xs mb-2">WALLPAPER</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              onClick={() => changeWallpaper(w.id)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                settings.wallpaper === w.id ? 'border-coral scale-[1.02]' : 'border-white/10 hover:border-white/30'
              }`}
              aria-label={`Wallpaper ${w.name}`}
            >
              <Wallpaper id={w.id} />
              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] font-pixel py-1 text-center">
                {w.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
          <div className="font-pixel text-coral text-xs mb-2">TEMA</div>
          <div className="flex gap-2">
            {(['dark', 'light'] as const).map((t) => (
              <button
                key={t}
                onClick={() => changeTheme(t)}
                className={`flex-1 py-1.5 rounded font-pixel text-[10px] ${
                  settings.theme === t ? 'bg-coral text-white' : 'bg-black/30 hover:bg-white/10'
                }`}
              >
                {t === 'dark' ? '☾ GELAP' : '☀ TERANG'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
          <div className="font-pixel text-coral text-xs mb-2">PERFORMA</div>
          <div className="flex gap-1">
            {(['auto', 'high', 'lite'] as const).map((p) => (
              <button
                key={p}
                onClick={() => settings.setPerformance(p)}
                className={`flex-1 py-1.5 rounded font-pixel text-[9px] uppercase ${
                  settings.performance === p ? 'bg-coral text-white' : 'bg-black/30 hover:bg-white/10'
                }`}
              >
                {p === 'auto' ? 'AUTO' : p === 'high' ? 'HIGH' : 'LITE'}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/40 mt-1">Lite: blur & animasi dikurangi.</p>
        </div>
      </section>

      <section className="space-y-2">
        {[
          { key: 'sound' as const, label: 'Suara / SFX', desc: 'Default mati. Tidak ada autoplay.' },
          { key: 'showMascot' as const, label: 'Tampilkan Maskot', desc: 'Robot kecil di atas dock.' },
        ].map((row) => (
          <label key={row.key} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer">
            <span>
              <span className="font-pixel text-xs block">{row.label}</span>
              <span className="text-[10px] text-white/40">{row.desc}</span>
            </span>
            <input
              type="checkbox"
              checked={settings[row.key]}
              onChange={(e) => settings[row.key === 'sound' ? 'setSound' : 'setShowMascot'](e.target.checked)}
              className="w-4 h-4 accent-[#FD796C]"
            />
          </label>
        ))}
      </section>

      <section className="p-3 bg-white/5 border border-white/10 rounded-lg">
        <div className="font-pixel text-coral text-xs mb-2">FREKUENSI CANDAAN</div>
        <div className="flex gap-1">
          {FREQ.map((f) => (
            <button
              key={f.id}
              onClick={() => settings.setJokeFrequency(f.id)}
              className={`flex-1 py-1.5 rounded font-pixel text-[9px] ${
                settings.jokeFrequency === f.id ? 'bg-coral text-white' : 'bg-black/30 hover:bg-white/10'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded font-pixel text-[10px]"
        >
          <RotateCw size={12} /> RESTART OS
        </button>
        <a
          href="#/simple"
          className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded font-pixel text-[10px]"
        >
          <ExternalLink size={12} /> SIMPLE VIEW
        </a>
      </section>
    </div>
  );
};

export default Settings;
