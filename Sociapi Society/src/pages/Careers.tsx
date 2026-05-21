import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Check, X, AlertCircle, Upload } from 'lucide-react';
import { CareerItem } from '../data/initialData';

interface CareersProps {
  careers: CareerItem[];
}

export const Careers: React.FC<CareersProps> = ({ careers }) => {
  const [selectedRole, setSelectedRole] = useState<CareerItem | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Application form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !fileName) return;

    setApplySuccess(true);
    setFullName('');
    setEmail('');
    setGithubUrl('');
    setNotes('');
    setFileName('');
    setUploadProgress(0);

    setTimeout(() => {
      setApplySuccess(false);
      setIsApplyModalOpen(false);
      setSelectedRole(null);
    }, 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    // Simulate upload progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 150);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
      
      {/* Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Roster Enrollment // careers</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          JOIN THE <span className="text-[#7bd355] glow-text">COMMAND STACK</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Unlock exclusive technical access, leadership certification, and developer bootcamps by volunteering with the Sociapi Society.
        </p>
        
        {/* Highlighted Open Volunteer positions list */}
        <div className="glass-panel p-4.5 rounded-xl border border-[#7bd355]/20 max-w-3xl mx-auto">
          <span className="block text-[9px] uppercase tracking-widest font-mono text-[#7bd355] mb-2 font-bold">★ Active Open Volunteer Positions</span>
          <div className="flex flex-wrap justify-center gap-2">
            {['Organizer', 'Graphic Designers', 'Media Team', 'Outreach Team', 'Decor Team', 'Technical Team', 'Logistics Team', 'Finance Team', 'HR Team'].map((pos, pIdx) => (
              <span key={pIdx} className="text-[10px] bg-[#333333] border border-[#517642]/30 text-[#e8ecee] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                {pos}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Roster Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((role) => (
          <div 
            key={role.id}
            className="glass-panel p-6 rounded-2xl border border-[#333333] hover:border-[#7bd355]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2.5 py-0.5 rounded">
                  {role.type}
                </span>
                <Briefcase className="w-4 h-4 text-[#939596]" />
              </div>

              <div>
                <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] tracking-wide mt-1">{role.title}</h3>
                <span className="block text-[10px] text-[#939596] mt-0.5">{role.department} Department</span>
              </div>

              <p className="text-xs text-[#939596] leading-relaxed line-clamp-3">
                {role.description}
              </p>

              <div className="flex items-center space-x-4 text-[10px] text-[#939596] pt-3 border-t border-[#333333]">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {role.location}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {role.duration}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRole(role)}
              className="mt-6 w-full py-3 bg-[#333333] hover:bg-[#7bd355] hover:text-[#121212] border border-[#7bd355]/20 text-[#7bd355] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all"
            >
              Analyze Role Details
            </button>
          </div>
        ))}
      </div>

      {/* ROLE DETAIL & REQUIREMENTS DIALOG */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/90 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#1e1e1e] border border-[#7bd355]/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#121212]/80 border border-[#939596]/10 text-[#939596] hover:text-[#7bd355]"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                {selectedRole.type} Listing
              </span>
              <h2 className="text-xl font-futuristic font-bold text-[#e8ecee] mt-2">{selectedRole.title}</h2>
              <span className="text-[10px] text-[#939596]">{selectedRole.department} Department • {selectedRole.duration}</span>
            </div>

            <div className="space-y-2 border-t border-[#333333] pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Mission Parameters</h4>
              <p className="text-xs text-[#939596] leading-relaxed">
                {selectedRole.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Requirements</h4>
                <ul className="space-y-2 text-xs text-[#939596]">
                  {selectedRole.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#7bd355]">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Roster Benefits</h4>
                <ul className="space-y-2 text-xs text-[#939596]">
                  {selectedRole.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#7bd355] shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#333333] flex items-center justify-between">
              <span className="text-[10px] text-[#939596]">Hiring Status: Open</span>
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] text-xs font-bold uppercase tracking-widest transition-all"
              >
                Enlist Seat
              </button>
            </div>

          </div>
        </div>
      )}

      {/* APPLY APPLICATION MODAL */}
      {isApplyModalOpen && selectedRole && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-[#121212]/95 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1e1e1e] border border-[#7bd355]/40 rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between">
              <h3 className="font-futuristic font-bold text-xs uppercase tracking-widest text-[#7bd355]">Enlistment Dispatch</h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 rounded-full hover:bg-[#333333] text-[#939596] hover:text-[#7bd355]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applySuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
                  ✓
                </div>
                <h4 className="font-futuristic font-bold text-[#e8ecee]">Roster Dispatch Transmitted!</h4>
                <p className="text-xs text-[#939596]">
                  Thank you! Your profile coordinates and CV files have been linked to the recruitment queue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                
                <div className="p-3 rounded-lg bg-[#333333] text-[#939596] flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#7bd355] shrink-0 mt-0.5" />
                  <p className="text-[10px]">
                    You are applying for: <span className="text-[#e8ecee] font-semibold">{selectedRole.title}</span>. Ensure CV coordinates are correct.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Bilal Shah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">University Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. bilal@student.uop.edu.pk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Github / Portfolio URL</label>
                  <input
                    type="url"
                    placeholder="e.g. https://github.com/username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                {/* Simulated file upload */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Upload CV (PDF / DOC)</label>
                  <div className="relative border border-dashed border-[#333333] rounded-lg p-4 text-center hover:border-[#7bd355]/40 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-[#939596] mx-auto mb-2" />
                    <span className="block text-[10px] text-[#939596]">
                      {fileName ? fileName : 'Drag & drop or browse computer'}
                    </span>
                    
                    {fileName && (
                      <div className="mt-3 w-full bg-[#333333] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#7bd355] h-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Additional Notes / Cover Letter</label>
                  <textarea
                    placeholder="Tell us why you want to join and what you seek to learn..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploadProgress < 100 && fileName !== ''}
                  className="w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Roster Application
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
