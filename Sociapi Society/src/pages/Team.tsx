import React, { useState } from 'react';
import { Search, Mail, Eye, X } from 'lucide-react';
import { TeamMember } from '../data/initialData';

interface TeamProps {
  team: TeamMember[];
}

export const Team: React.FC<TeamProps> = ({ team }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDepartment, setActiveDepartment] = useState<'All' | TeamMember['department']>('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Departments list
  const departments: ('All' | TeamMember['department'])[] = [
    'All', 'Leadership', 'Technical', 'Design & Media', 'Operations', 'Administration'
  ];

  // Filters
  const filteredTeam = team.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDept = activeDepartment === 'All' || member.department === activeDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
      
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Guild Roster // team</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          SOCIAPI <span className="text-[#7bd355] glow-text">CORE ENGINEERS</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Meet the minds scaling robotics, AI, and full-stack ecosystems. Tap on profiles to explore credentials.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#333333] pb-6">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeDepartment === dept
                  ? 'bg-[#7bd355] text-[#121212] font-bold shadow-[0_0_15px_rgba(123,211,85,0.25)]'
                  : 'text-[#939596] hover:text-[#e8ecee] hover:bg-[#333333]/30'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search roster..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#333333] rounded-full py-2.5 pl-9 pr-4 text-xs text-[#e8ecee] focus:outline-none focus:border-[#7bd355]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#939596]" />
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
              member.premium 
                ? 'border-[#7bd355]/30 shadow-[0_0_20px_rgba(123,211,85,0.06)] hover:border-[#7bd355]' 
                : 'border-[#333333] hover:border-[#7bd355]/40'
            }`}
          >
            {member.premium && (
              <span className="absolute top-4 right-4 bg-[#7bd355]/10 border border-[#7bd355]/30 text-[#7bd355] text-[8px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                Command Staff
              </span>
            )}
            
            <div className="space-y-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#161616] border border-[#333333] shrink-0">
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-[#7bd355] tracking-widest">{member.department}</span>
                <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] mt-1 line-clamp-1">{member.name}</h3>
                <p className="text-[10px] text-[#939596] truncate">{member.role}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="text-[8px] font-mono text-[#e8ecee] bg-[#333333] px-1.5 py-0.5 rounded border border-[#939596]/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#333333] flex items-center justify-between">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#939596] flex items-center group-hover:text-[#7bd355] transition-colors">
                <Eye className="w-3.5 h-3.5 mr-1" /> View Profile
              </span>
              
              <div className="flex space-x-2">
                <a href={member.socials.github || '#'} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-[#939596] hover:text-[#7bd355] transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={member.socials.linkedin || '#'} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-[#939596] hover:text-[#7bd355] transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MEMBER DETAILS MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/90 backdrop-blur-md overflow-hidden">
          <div className="relative w-full max-w-xl bg-[#1e1e1e] border border-[#7bd355]/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#121212]/80 border border-[#939596]/10 text-[#939596] hover:text-[#7bd355]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <img 
                src={selectedMember.avatar} 
                alt={selectedMember.name} 
                className="w-24 h-24 rounded-2xl object-cover border-2 border-[#7bd355]/30"
              />
              <div className="text-center sm:text-left space-y-2">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2.5 py-0.5 rounded-full">
                    {selectedMember.department} Department
                  </span>
                  <h2 className="text-xl font-futuristic font-bold text-[#e8ecee] mt-2">{selectedMember.name}</h2>
                  <p className="text-xs text-[#939596]">{selectedMember.role}</p>
                </div>

                <div className="flex justify-center sm:justify-start space-x-3">
                  <a href={selectedMember.socials.github || '#'} target="_blank" rel="noreferrer" className="text-[#939596] hover:text-[#7bd355] transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href={selectedMember.socials.linkedin || '#'} target="_blank" rel="noreferrer" className="text-[#939596] hover:text-[#7bd355] transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  {selectedMember.socials.email && (
                    <a href={`mailto:${selectedMember.socials.email}`} className="text-[#939596] hover:text-[#7bd355] transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#333333]">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Biography Summary</h4>
              <p className="text-xs text-[#939596] leading-relaxed">
                {selectedMember.bio}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Verified Credentials</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedMember.skills.map((skill, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-[#e8ecee] bg-[#333333] px-2.5 py-0.5 rounded border border-[#939596]/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-[10px] text-[#939596] border-t border-[#333333]">
              <span>ID Code: {selectedMember.id}</span>
              <span>Est. Joining: Dec 2025</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
