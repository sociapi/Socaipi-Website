import React, { useState } from 'react';
import { Sparkles, Gift, Handshake, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { PartnershipInquiry } from '../data/initialData';

interface PartnerProps {
  partnerships: PartnershipInquiry[];
  setPartnerships: React.Dispatch<React.SetStateAction<PartnershipInquiry[]>>;
}

export const Partner: React.FC<PartnerProps> = ({ setPartnerships }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'Event' | 'Learning' | 'Community'>('Event');
  const [details, setDetails] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !email || !details) return;

    const newInquiry: PartnershipInquiry = {
      id: `prt-${Date.now()}`,
      companyName,
      contactPerson,
      email,
      type,
      details,
      date: new Date().toISOString().split('T')[0]
    };

    setPartnerships((prev) => [newInquiry, ...prev]);
    setSuccess(true);
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setDetails('');
    
    setTimeout(() => setSuccess(false), 4000);
  };

  const partnerTypes = [
    {
      id: 'Event',
      title: 'Event Partner',
      desc: 'Co-sponsor our large-scale hackathons, code jams, or robotics exhibition rounds. Place your brand in front of Peshawar’s top emerging student builders.',
      benefits: ['Prominent logo placement on posters and streams', 'Sponsor tables & presentation pitches during event opening', 'Direct access to developer profiles and resumes'],
      icon: Sparkles,
    },
    {
      id: 'Learning',
      title: 'Learning Partner',
      desc: 'Help us conduct high-quality specialized bootcamps. Provide course materials, sandbox credits, API keys, or specialized hardware rigs.',
      benefits: ['Curriculum collaboration & branding on study sets', 'Hardware/software showcases to target student developers', 'Speaker slots in technical workshops'],
      icon: Gift,
    },
    {
      id: 'Community',
      title: 'Community Partner',
      desc: 'Build cross-society networks, share opportunities, run joint newsletters, and organize regional dev meets in Khyber Pakhtunkhwa.',
      benefits: ['Shared distribution lists & event rosters', 'Joint student initiatives and combined coding groups', 'Collaborative outreach support for local programs'],
      icon: Handshake,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-20 relative z-10">
      
      {/* Page Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Strategic Alliances // partner_us</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          COLLABORATE <span className="text-[#7bd355] glow-text">WITH US</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Sponsor events, power bootcamps, and gain early access to talent. Form a strategic alliance with the Sociapi community at Islamia University Peshawar.
        </p>
      </div>

      {/* Partnership Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {partnerTypes.map((partner) => (
          <div 
            key={partner.id}
            className="glass-panel p-6 md:p-8 rounded-2xl border border-[#333333] hover:border-[#7bd355]/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#333333] border border-[#7bd355]/20 flex items-center justify-center text-[#7bd355] glow-shadow-neon">
                  <partner.icon className="w-5 h-5" />
                </div>
                <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">{partner.title}</h3>
              </div>

              <p className="text-xs text-[#939596] leading-relaxed">{partner.desc}</p>

              <div className="space-y-2.5 pt-4 border-t border-[#333333]">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Alliance Rewards</h4>
                <ul className="space-y-2 text-[11px] text-[#939596]">
                  {partner.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#7bd355] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                setType(partner.id as any);
                const formEl = document.getElementById('partnership-inquiry-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-8 w-full py-3 bg-[#333333] hover:bg-[#7bd355] hover:text-[#121212] border border-[#7bd355]/20 text-[#7bd355] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all"
            >
              Select Channel
            </button>
          </div>
        ))}
      </div>

      {/* Collaboration Process */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Strategic Onboarding Process</h2>
          <p className="text-[10px] text-[#939596] uppercase tracking-widest font-mono">From inquiry validation to operation coordination</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[
            { step: '01', title: 'Submit Proposal', desc: 'Initialize inquiry using the form below detailing sponsor channel & expectations.' },
            { step: '02', title: 'Technical Review', desc: 'Our command staff validates alignment with upcoming bootcamp schedules.' },
            { step: '03', title: 'Alliance Coordination', desc: 'Sync up on details, establish logistics, and coordinate resources.' },
            { step: '04', title: 'Campaign Execution', desc: 'Launch the campaign live at the Islamia University campus.' }
          ].map((proc, idx) => (
            <div key={idx} className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-2xl relative space-y-3">
              <span className="block text-3xl font-futuristic font-black text-[#7bd355]/20 font-mono">{proc.step}</span>
              <h4 className="font-futuristic font-bold text-xs uppercase tracking-wider text-[#e8ecee]">{proc.title}</h4>
              <p className="text-xs text-[#939596] leading-relaxed">{proc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Form */}
      <div id="partnership-inquiry-form" className="scroll-mt-24 max-w-3xl mx-auto glass-panel border border-[#7bd355]/20 rounded-2xl p-6 md:p-8 space-y-6">
        
        <div className="flex items-center space-x-3 pb-4 border-b border-[#333333]">
          <div className="p-2 rounded-lg bg-[#333333] text-[#7bd355]">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">Alliance Registration</h3>
            <p className="text-[9px] text-[#939596] uppercase tracking-widest">Connect with community management team</p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
              ✓
            </div>
            <h4 className="font-futuristic font-bold text-[#e8ecee]">Proposal Transmitted!</h4>
            <p className="text-xs text-[#939596]">
              Your alliance request coordinates have been successfully mapped to the command stack.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Company / Organization Name</label>
              <input
                type="text"
                placeholder="e.g. Peshawar Tech Labs"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Primary Contact Person</label>
              <input
                type="text"
                placeholder="e.g. Haris Khan"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                required
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Business Email Address</label>
              <input
                type="email"
                placeholder="e.g. haris@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Alliance Channel</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              >
                <option value="Event">Event Partner</option>
                <option value="Learning">Learning Partner</option>
                <option value="Community">Community Partner</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Alliance Proposal Details</label>
              <textarea
                placeholder="Describe your goals, co-sponsorship outline, or required assistance..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                rows={4}
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="md:col-span-2 pt-2 flex items-center space-x-2 text-[10px] text-[#939596]">
              <AlertCircle className="w-4 h-4 text-[#7bd355] shrink-0" />
              <span>By submitting, you agree to coordinate with the operations team of Islamia University Peshawar.</span>
            </div>

            <button
              type="submit"
              className="md:col-span-2 w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
            >
              Transmit Partnership Proposal
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
