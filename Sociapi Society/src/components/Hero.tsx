import React from 'react';
import { Sparkles, Terminal, Rocket, ChevronDown } from 'lucide-react';

import { SiteSettings } from '../data/initialData';

interface HeroProps {
  setCurrentPage: (page: string) => void;
  memberCount: number;
  eventCount: number;
  settings: SiteSettings;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentPage, memberCount, eventCount, settings }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-8 py-24 overflow-hidden">
      
      {/* Immersive Grid & Glowing Ambient Lights */}
      <div className="absolute inset-0 cyber-grid opacity-35 z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[#517642]/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full bg-[#7bd355]/5 blur-[90px] pointer-events-none z-0" />

      {/* Futuristic floating 3D-like cards decoration */}
      <div className="absolute top-36 left-[8%] hidden xl:block animate-float-slow pointer-events-none z-10">
        <div className="glass-panel p-4 rounded-xl border border-[#7bd355]/20 max-w-[200px] rotate-[-6deg] shadow-2xl">
          <div className="flex items-center space-x-2 text-[10px] text-[#7bd355] font-mono tracking-widest uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7bd355] animate-ping" />
            <span>Core AI engine</span>
          </div>
          <p className="text-[11px] text-[#e8ecee] font-mono font-bold">import torch.nn as nn</p>
          <div className="w-full bg-[#333333] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#7bd355] h-full w-[75%] animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-[8%] hidden xl:block animate-float-medium pointer-events-none z-10">
        <div className="glass-panel p-4 rounded-xl border border-[#517642]/40 max-w-[220px] rotate-[8deg] shadow-2xl">
          <div className="flex items-center space-x-2 text-[10px] text-[#939596] font-mono uppercase mb-2">
            <Terminal className="w-3.5 h-3.5 text-[#7bd355]" />
            <span>Vision Core</span>
          </div>
          <p className="text-[11px] text-[#7bd355] font-mono">cv2.VideoCapture(0)</p>
          <span className="block text-[8px] text-[#939596] mt-1 font-mono">Frame Rate: 60fps</span>
        </div>
      </div>

      {/* Main Hero Contents */}
      <div className="max-w-5xl text-center relative z-10 space-y-8 px-4 flex flex-col items-center">
        
        {/* Modern Tag badge */}
        <div className="inline-flex items-center space-x-2 bg-[#333333] border border-[#7bd355]/30 rounded-full px-4.5 py-1.5 shadow-lg shadow-black/30 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#7bd355]" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#e8ecee] uppercase font-futuristic">
            From Ideas To Intelligence
          </span>
        </div>

        {/* Dynamic Big Headings */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-futuristic font-black tracking-tight leading-none text-[#e8ecee]">
            TURN IDEAS <br className="hidden sm:inline" />
            INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7bd355] via-[#517642] to-[#7bd355] glow-text">REAL PROJECTS</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-[#939596] leading-relaxed">
            Welcome to <span className="text-[#e8ecee] font-semibold">Sociapi Society</span>, the premier student-led hub at Islamia University Peshawar. We turn programming, artificial intelligence, robotics, and digital engineering into practical portfolios.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md pt-4">
          <button
            onClick={() => setCurrentPage('events')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7bd355] text-[#121212] font-semibold text-xs uppercase tracking-widest hover:bg-[#517642] hover:text-[#e8ecee] hover:shadow-[0_0_25px_rgba(123,211,85,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Explore Events</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('careers')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#333333] border border-[#7bd355]/30 text-[#7bd355] hover:border-[#7bd355] hover:text-[#e8ecee] font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
            <span>Join Roster</span>
          </button>
        </div>

        {/* Real-time Community Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 w-full max-w-4xl border-t border-[#333333]/60">
          
          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-bold font-futuristic text-[#7bd355] glow-text">
              {settings.foundedDate || 'Dec 2025'}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-[#939596]">Founded Date</span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-bold font-futuristic text-[#7bd355] glow-text">
              {settings.membersCount || `${memberCount}+`}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-[#939596]">Active Members</span>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl md:text-3xl font-bold font-futuristic text-[#7bd355] glow-text">
              {settings.eventsCount || eventCount}
            </span>
            <span className="block text-[9px] uppercase tracking-wider text-[#939596]">Events Organized</span>
          </div>

          <div className="space-y-1 flex flex-col items-center justify-center">
            <span className="block text-xs font-bold font-futuristic text-[#e8ecee] uppercase tracking-widest">
              {settings.campusName || 'Islamia University'}
            </span>
            <span className="block text-[8px] uppercase tracking-wider text-[#939596]">
              {settings.campusLocation || 'Peshawar'} Campus
            </span>
          </div>

        </div>

      </div>

      {/* Downward scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-10" onClick={() => {
        const nextEl = document.getElementById('why-choose-us');
        if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
      }}>
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#939596]">Initialize Descent</span>
        <ChevronDown className="w-4 h-4 text-[#7bd355] animate-bounce" />
      </div>

    </section>
  );
};
