import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { speakJoke } from '../../lib/humor';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const CV: React.FC = () => {
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    speakJoke('downloadCv', { force: true });
    window.open(portfolioData.cvPdf, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-black/40 text-white font-sans">
      <div className="p-2 bg-black/40 border-b border-white/10 flex items-center justify-between font-pixel text-[10px]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(150, z + 10))}
            className="p-1 hover:bg-white/10 rounded"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(70, z - 10))}
            className="p-1 hover:bg-white/10 rounded"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => setZoom(100)}
            className="p-1 hover:bg-white/10 rounded"
            title="Reset Zoom"
          >
            <RotateCcw size={14} />
          </button>
          <span className="text-white/40">{zoom}%</span>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-3 py-1 bg-coral hover:bg-coral/80 text-white rounded font-pixel text-[9px]"
        >
          <Download size={12} /> SIMPAN PDF
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <div
          className="bg-white text-gray-900 p-6 rounded shadow-2xl max-w-2xl w-full font-mono text-xs transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className="border-b-2 border-gray-900 pb-3 mb-4">
            <h1 className="text-xl font-bold tracking-tight uppercase">{portfolioData.name}</h1>
            <p className="text-gray-700 text-xs font-sans">{portfolioData.role.id}</p>
            <p className="text-gray-500 text-[10px] mt-1">
              {portfolioData.contact.email} · {portfolioData.contact.whatsapp} · South Tangerang, ID
            </p>
          </div>

          <div className="space-y-4">
            <section>
              <h2 className="font-bold border-b border-gray-300 pb-1 mb-2 text-xs uppercase tracking-wider text-coral">
                PENDIDIKAN & PENGALAMAN
              </h2>
              <div className="space-y-3">
                {portfolioData.timeline.map((item, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-900">{item.title.id}</div>
                      <div className="text-gray-600 text-[11px]">{item.org.id}</div>
                      {item.desc && <div className="text-gray-500 text-[10px] mt-0.5">{item.desc.id}</div>}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{item.date.id}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-bold border-b border-gray-300 pb-1 mb-2 text-xs uppercase tracking-wider text-coral">
                KETERAMPILAN & TEKNOLOGI
              </h2>
              <div className="flex flex-wrap gap-1 text-[10px]">
                {portfolioData.skills.tech.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-gray-800 font-semibold">
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
