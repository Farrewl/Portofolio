import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '../../store/osStore';
import { speakJoke } from '../../lib/humor';
import { useLocation } from 'wouter';

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>(['Welcome to IbnuOS v1.0.0', 'Type "help" to get started.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [_, navigate] = useLocation();

  const handleCommand = (cmd: string) => {
    const parts = cmd.toLowerCase().trim().split(' ');
    const c = parts[0];
    let res = '';
    speakJoke('terminal', { force: true, cooldown: 2000 });
    
    switch (c) {
      case 'help': res = 'Available: about, projects, cv, skills, contact, clear, whoami, coffee, konami'; break;
      case 'about': case 'projects': case 'cv': case 'skills': case 'contact':
        navigate('/' + c); 
        res = 'Opening ' + c + '...';
        break;
      case 'clear': setLines([]); return;
      case 'whoami': res = 'Ibnu Farrel Athaillah Firdaus — Student @ Undip'; break;
      case 'coffee': res = 'Brewing coffee... [OK] ☕'; break;
      case 'konami': speakJoke('konami', { force: true }); res = 'Cheat code activated!'; break;
      default: res = 'Unknown command: ' + c; break;
    }
    setLines(l => [...l, `> ${cmd}`, res]);
  };

  return (
    <div className="h-full bg-black p-3 font-mono text-[11px] text-green-400 overflow-y-auto" ref={scrollRef}>
      {lines.map((l, i) => <div key={i}>{l}</div>)}
      <div className="flex gap-1">
        <span>$</span>
        <input 
          autoFocus
          className="flex-1 bg-transparent outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
              setInput('');
            }
          }}
        />
      </div>
    </div>
  );
};

export default Terminal;
