import React from 'react';
import { portfolioData } from '../../data/portfolio';

const colors: Record<string, string> = {
  web: 'bg-coral',
  ml: 'bg-blue-400',
  embedded: 'bg-purple-400',
  sec: 'bg-green-400',
};

const Skills: React.FC = () => {
  const avg = Math.round(
    portfolioData.skillLevels.reduce((a, b) => a + b.level, 0) / portfolioData.skillLevels.length,
  );

  return (
    <div className="flex flex-col h-full text-white/90 font-sans p-4 space-y-4 overflow-y-auto">
      <div className="p-3 bg-black/30 border border-white/10 rounded-lg flex items-center justify-between">
        <div>
          <div className="font-pixel text-coral text-xs">ACTIVITY MONITOR — SKILLS</div>
          <div className="text-[10px] text-white/50">CPU LOAD: {avg}% · MEMORY: 1.4 GB / 8 GB</div>
        </div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" aria-hidden />
      </div>

      <div className="space-y-3">
        {portfolioData.skillLevels.map((sk) => (
          <div key={sk.name} className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-1.5">
            <div className="flex justify-between font-pixel text-xs">
              <span>{sk.name}</span>
              <span className="text-coral">{sk.level}%</span>
            </div>
            <div className="w-full h-2.5 bg-black/40 rounded overflow-hidden p-0.5">
              <div
                className={`h-full rounded-sm transition-[width] duration-500 ${colors[sk.field]}`}
                style={{ width: `${sk.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/10">
        <div className="font-pixel text-xs text-coral mb-2">TEKNOLOGI</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {portfolioData.skills.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-black/40 border border-white/10 rounded text-[10px] text-white/70">
              {t}
            </span>
          ))}
        </div>
        <div className="font-pixel text-xs text-coral mb-2">BIDANG MINAT UTAMA</div>
        <div className="flex flex-wrap gap-2">
          {portfolioData.skills.interest.map((item) => (
            <span
              key={item.id}
              className="px-3 py-1 bg-white/10 border border-white/10 rounded-full font-pixel text-[10px] text-peach"
            >
              {item.id}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
