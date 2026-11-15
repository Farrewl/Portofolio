import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { speakJoke } from '../../lib/humor';
import { Mail, Send, Copy, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    speakJoke('submitForm', { force: true });
    window.location.href = `mailto:${portfolioData.contact.email}?subject=${formData.subject}&body=${formData.message}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    // simple toast
  };

  return (
    <div className="flex flex-col h-full text-white/90 font-sans p-4 space-y-4 overflow-y-auto">
      <div className="flex gap-2">
        <a href={`mailto:${portfolioData.contact.email}`} className="flex-1 p-3 bg-coral hover:bg-coral/80 rounded flex items-center justify-center gap-2 font-pixel text-xs transition-colors">
          <Mail size={14} /> EMAIL
        </a>
        <button onClick={copyEmail} className="p-3 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center gap-2 font-pixel text-xs transition-colors">
          <Copy size={14} /> SALIN
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-black/20 border border-white/10 rounded-lg">
        <input 
          type="text" placeholder="Nama Anda" className="w-full bg-black/40 border border-white/10 p-2 text-xs rounded outline-none focus:border-coral"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input 
          type="text" placeholder="Subjek Pesan" className="w-full bg-black/40 border border-white/10 p-2 text-xs rounded outline-none focus:border-coral"
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        />
        <textarea 
          placeholder="Tulis pesan untuk saya..." className="w-full bg-black/40 border border-white/10 p-2 text-xs rounded outline-none focus:border-coral h-24 resize-none"
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
        />
        <button type="submit" className="w-full p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded font-pixel text-xs flex items-center justify-center gap-2">
          <Send size={12} /> KIRIM EMAIL
        </button>
      </form>

      <div className="flex justify-center gap-4 py-2 border-t border-white/10">
        <a href={`https://wa.me/${portfolioData.contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-coral"><MessageCircle size={20} /></a>
        <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="hover:text-coral"><Github size={20} /></a>
        <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-coral"><Linkedin size={20} /></a>
        <a href={portfolioData.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-coral"><Instagram size={20} /></a>
      </div>
    </div>
  );
};

export default Contact;
