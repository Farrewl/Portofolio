import React, { useState } from 'react';
import { portfolioData, Project } from '../../data/portfolio';
import { ExternalLink, Github } from 'lucide-react';
import { speakOpen } from '../../lib/humor';

const Preview: React.FC<{ type: Project['previewType'] }> = ({ type }) => {
  const common = 'w-full h-24 rounded border border-white/10 bg-black/40 relative overflow-hidden';
  if (type === 'radar') {
    return (
      <div className={common} aria-hidden>
        <svg viewBox="0 0 200 80" className="w-full h-full">
          <g transform="translate(100,40)">
            <circle r="8" className="fill-none stroke-coral/40" strokeDasharray="2 2" />
            <circle r="16" className="fill-none stroke-coral/30" strokeDasharray="2 2" />
            <circle r="24" className="fill-none stroke-coral/20" strokeDasharray="2 2" />
            <line x1="-28" y1="0" x2="28" y2="0" className="stroke-white/10" />
            <line x1="0" y1="-28" x2="0" y2="28" className="stroke-white/10" />
            <circle cx="10" cy="-12" r="1.5" className="fill-coral" />
            <circle cx="-14" cy="6" r="1.5" className="fill-peach" />
            <path d="M-5 2 L0 -5 L5 2 L3 2 L3 5 L-3 5 L-3 2 Z" className="fill-white/70" />
          </g>
        </svg>
      </div>
    );
  }
  if (type === 'convert') {
    return (
      <div className={common} aria-hidden>
        <svg viewBox="0 0 200 80" className="w-full h-full">
          <rect x="30" y="18" width="44" height="44" rx="3" className="fill-white/10 stroke-white/20" />
          <text x="52" y="44" textAnchor="middle" className="fill-white/50 text-[8px] font-pixel">DOCX</text>
          <rect x="126" y="18" width="44" height="44" rx="3" className="fill-coral/20 stroke-coral/40" />
          <text x="148" y="44" textAnchor="middle" className="fill-coral text-[8px] font-pixel">PDF</text>
          <path d="M80 34 C 95 24, 105 24, 120 34" className="stroke-peach fill-none" />
          <path d="M120 50 C 105 60, 95 60, 80 50" className="stroke-peach fill-none" />
        </svg>
      </div>
    );
  }
  return (
    <div className={common} aria-hidden>
      <svg viewBox="0 0 200 80" className="w-full h-full">
        <path d="M100 14 L70 58 L130 58 Z" className="fill-none stroke-coral/30" strokeDasharray="2 3" />
        <circle cx="100" cy="14" r="5" className="fill-coral" />
        <text x="100" y="9" textAnchor="middle" className="fill-white/60 text-[7px] font-pixel">BUYER</text>
        <circle cx="70" cy="58" r="5" className="fill-peach" />
        <text x="70" y="70" textAnchor="middle" className="fill-white/60 text-[7px] font-pixel">SELLER</text>
        <circle cx="130" cy="58" r="5" className="fill-white/60" />
        <text x="130" y="70" textAnchor="middle" className="fill-white/60 text-[7px] font-pixel">DRIVER</text>
      </svg>
    </div>
  );
};

const Projects: React.FC = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="flex flex-col h-full text-white/90 font-sans relative">
      <div className="p-3 bg-black/20 border-b border-white/10 flex items-center justify-between font-pixel text-[10px]">
        <span className="text-coral">PROYEK UNGGULAN ({portfolioData.projects.length})</span>
        <span className="text-white/40">KLIK UNTUK DETAIL</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portfolioData.projects.map((p) => (
          <button
            key={p.id}
            onClick={() => { setActive(p); speakOpen('projects'); }}
            className="text-left group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 rounded-lg p-3 transition-colors flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            <div>
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="font-pixel text-xs text-coral">{p.title}</span>
                <span className="text-[9px] font-pixel text-white/40 px-1.5 py-0.5 border border-white/10 rounded whitespace-nowrap">
                  {p.badge.id}
                </span>
              </div>
              <Preview type={p.previewType} />
              <p className="text-xs text-white/70 mt-3 mb-3 line-clamp-3">{p.desc.id}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {p.tech.map((t) => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 bg-black/40 text-peach rounded">
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center z-20" role="dialog" aria-label={`${active.title} detail`}>
          <div className="bg-black/90 border border-coral/40 rounded-xl p-4 max-w-lg w-full space-y-3 font-sans text-xs relative">
            <button
              onClick={() => setActive(null)}
              className="absolute top-2 right-3 font-pixel text-coral text-sm hover:text-white"
              aria-label="Close detail"
            >
              [X]
            </button>
            <div className="font-pixel text-coral text-sm">{active.title}</div>
            <div className="text-[10px] text-peach font-pixel">{active.badge.id}</div>
            <Preview type={active.previewType} />
            <p className="text-white/80 leading-relaxed">{active.desc.id}</p>
            <div className="flex flex-wrap gap-1">
              {active.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 bg-white/10 font-mono text-[10px] rounded">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex gap-3">
              <a
                href={active.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-pixel text-[10px] px-3 py-1.5 bg-coral text-white rounded hover:bg-coral/80"
              >
                <ExternalLink size={12} /> DEMO
              </a>
              <a
                href={active.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-pixel text-[10px] px-3 py-1.5 bg-white/10 text-white rounded hover:bg-white/20"
              >
                <Github size={12} /> KODE
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
