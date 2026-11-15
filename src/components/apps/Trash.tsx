import React, { useState } from 'react';
import { speakJoke } from '../../lib/humor';
import { Trash2, RotateCcw, FileText } from 'lucide-react';

const FILES = [
  'bug_final_final_v2.js',
  'tugas_minggu_lalu.docx',
  'screenshot_error_2024.png',
  'rencana_tidur_awal.txt',
  'kopi_ke_7.jpg',
];

const Trash: React.FC = () => {
  const [files, setFiles] = useState(FILES);
  const [toast, setToast] = useState('');

  const remove = (file: string) => {
    setFiles((f) => f.filter((x) => x !== file));
    speakJoke('trashAction', { cooldown: 2000 });
    setToast(`"${file}" dihapus.`);
    setTimeout(() => setToast(''), 2500);
  };

  const empty = () => {
    if (files.length === 0) return;
    setFiles([]);
    speakJoke('trashAction', { force: true });
    setToast('Trash dikosongkan. Lega?');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div className="h-full flex flex-col text-white/90 font-sans relative">
      <div className="p-3 bg-black/20 border-b border-white/10 flex items-center justify-between font-pixel text-[10px]">
        <span className="text-coral">TRASH — {files.length} ITEM</span>
        <button onClick={empty} className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded flex items-center gap-1">
          <Trash2 size={12} /> KOSONGKAN
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {files.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/30 gap-2">
            <Trash2 size={40} />
            <p className="font-pixel text-xs">Kosong. Seperti janji-janji.</p>
          </div>
        ) : (
          files.map((file) => (
            <div key={file} className="flex items-center justify-between p-2.5 bg-white/5 border border-white/10 rounded group">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-white/40" />
                <span className="text-xs">{file}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => remove(file)}
                  className="p-1 hover:bg-coral/30 rounded opacity-60 group-hover:opacity-100"
                  aria-label={`Hapus ${file}`}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {toast && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 border border-coral/40 rounded font-pixel text-[10px] text-coral">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Trash;
