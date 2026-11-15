import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolio';

const About: React.FC = () => {
  const [tab, setTab] = useState<'bio' | 'facts' | 'stats'>('bio');

  return (
    <div className="flex flex-col sm:flex-row h-full text-white/90 text-xs sm:text-sm font-sans">
      <div className="w-full sm:w-44 bg-black/20 border-b sm:border-b-0 sm:border-r border-white/10 p-2 flex sm:flex-col gap-1 font-pixel text-[10px]">
        <button
          onClick={() => setTab('bio')}
          className={`px-3 py-2 rounded text-left transition-colors ${
            tab === 'bio' ? 'bg-coral text-white font-bold' : 'hover:bg-white/10'
          }`}
        >
          [ BIO ]
        </button>
        <button
          onClick={() => setTab('facts')}
          className={`px-3 py-2 rounded text-left transition-colors ${
            tab === 'facts' ? 'bg-coral text-white font-bold' : 'hover:bg-white/10'
          }`}
        >
          [ FUN FACTS ]
        </button>
        <button
          onClick={() => setTab('stats')}
          className={`px-3 py-2 rounded text-left transition-colors ${
            tab === 'stats' ? 'bg-coral text-white font-bold' : 'hover:bg-white/10'
          }`}
        >
          [ STATS ]
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {tab === 'bio' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <img
                src="assets/profile.jpg"
                alt={portfolioData.name}
                className="w-16 h-16 rounded-lg object-cover border border-coral/50"
              />
              <div>
                <h3 className="font-pixel text-coral text-base">{portfolioData.name}</h3>
                <p className="text-white/60 text-xs">{portfolioData.role.id}</p>
              </div>
            </div>

            <div className="space-y-2 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: portfolioData.bio.id1 }} />
              <p dangerouslySetInnerHTML={{ __html: portfolioData.bio.id2 }} />
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="font-pixel text-coral text-xs mb-2">BIDANG MINAT:</div>
              <div className="flex flex-wrap gap-1.5">
                {portfolioData.skills.interest.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white/10 border border-white/10 rounded font-pixel text-[10px]"
                  >
                    {i.id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'facts' && (
          <div className="space-y-3">
            <h4 className="font-pixel text-coral text-xs mb-2">CATATAN & FUN FACTS:</h4>
            <ul className="space-y-2">
              {portfolioData.funFacts.map((fact, i) => (
                <li
                  key={i}
                  className="p-3 bg-white/5 border border-white/10 rounded flex items-start gap-2"
                >
                  <span className="text-coral font-pixel">#0{i + 1}</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'stats' && (
          <div className="grid grid-cols-2 gap-3">
            {portfolioData.stats.map((st, i) => (
              <div key={i} className="p-3 bg-white/5 border border-white/10 rounded font-mono">
                <div className="text-2xl font-bold text-coral font-pixel">{st.value}</div>
                <div className="text-xs font-bold text-white/90">{st.label.id}</div>
                <div className="text-[10px] text-white/50">{st.sub.id}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
