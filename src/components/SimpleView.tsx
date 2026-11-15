import React from 'react';
import { portfolioData } from '../data/portfolio';

const SimpleView: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono selection:bg-coral selection:text-black">
      <div className="max-w-3xl mx-auto space-y-12 py-10">
        <header className="border-b border-coral/30 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-coral uppercase mb-2">{portfolioData.name}</h1>
          <p className="text-white/60">{portfolioData.role.id}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/40">
            <span>{portfolioData.contact.email}</span>
            <span>{portfolioData.contact.whatsapp}</span>
          </div>
        </header>

        <section>
          <h2 className="text-coral text-xs font-bold uppercase mb-4 tracking-widest">[ TENTANG SAYA ]</h2>
          <div className="space-y-4 text-white/80 leading-relaxed text-sm">
             <p dangerouslySetInnerHTML={{ __html: portfolioData.bio.id1 }} />
             <p dangerouslySetInnerHTML={{ __html: portfolioData.bio.id2 }} />
          </div>
        </section>

        <section>
          <h2 className="text-coral text-xs font-bold uppercase mb-4 tracking-widest">[ PROYEK ]</h2>
          <div className="grid gap-6">
            {portfolioData.projects.map(p => (
              <div key={p.id} className="border-l-2 border-white/10 pl-6 py-1">
                <h3 className="font-bold text-white/90">{p.title}</h3>
                <p className="text-xs text-white/50 mb-3">{p.desc.id}</p>
                <div className="flex gap-4 text-[10px]">
                  <a href={p.demoUrl} className="text-coral hover:underline">DEMO</a>
                  <a href={p.repoUrl} className="text-coral hover:underline">KODE</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
           <h2 className="text-coral text-xs font-bold uppercase mb-4 tracking-widest">[ PENDIDIKAN & PENGALAMAN ]</h2>
           <div className="space-y-6">
             {portfolioData.timeline.map((t, i) => (
               <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                 <div>
                   <div className="font-bold text-white/90">{t.title.id}</div>
                   <div className="text-xs text-white/50">{t.org.id}</div>
                 </div>
                 <div className="text-[10px] text-white/30 sm:text-right">{t.date.id}</div>
               </div>
             ))}
           </div>
        </section>

        <footer className="pt-10 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-widest">
           &copy; {new Date().getFullYear()} {portfolioData.name}
           <div className="mt-2 flex justify-center gap-4">
             <a href="#/" className="hover:text-coral transition-colors">OS VERSION</a>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default SimpleView;
