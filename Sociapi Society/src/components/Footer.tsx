import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative mt-20 border-t border-[#333333] bg-[#121212] overflow-hidden">
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#7bd355] to-transparent opacity-30 shadow-[0_0_20px_#7bd355]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#333333] border border-[#7bd355]/40 shadow-[0_0_10px_rgba(123,211,85,0.2)]">
                <span className="font-futuristic font-bold text-lg text-[#7bd355] glow-text">S</span>
              </div>
              <div>
                <span className="font-futuristic font-bold tracking-widest text-[#e8ecee]">SOCIAPI</span>
                <span className="block text-[8px] uppercase tracking-widest text-[#7bd355]">Islamia University</span>
              </div>
            </div>
            <p className="text-[#939596] text-xs leading-relaxed max-w-sm">
              A student-led community turning creative tech ideas into high-impact skills, engineering the next wave of local innovators since December 2025.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://github.com/zuhairzeb" target="https://github.com/zuhairzeb" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#333333] border border-[#939596]/10 flex items-center justify-center text-[#939596] hover:text-[#7bd355] hover:border-[#7bd355]/40 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/sociapisociety/"target="https://www.linkedin.com/company/sociapisociety/" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#333333] border border-[#939596]/10 flex items-center justify-center text-[#939596] hover:text-[#7bd355] hover:border-[#7bd355]/40 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://x.com/sociapisociety" target="https://x.com/sociapisociety" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#333333] border border-[#939596]/10 flex items-center justify-center text-[#939596] hover:text-[#7bd355] hover:border-[#7bd355]/40 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-futuristic text-xs font-bold uppercase tracking-wider text-[#e8ecee]">Sitemap</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setCurrentPage('home')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Home</button>
              <button onClick={() => setCurrentPage('about')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">About</button>
              <button onClick={() => setCurrentPage('events')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Events</button>
              <button onClick={() => setCurrentPage('blog')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Blog</button>
              <button onClick={() => setCurrentPage('team')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Team</button>
              <button onClick={() => setCurrentPage('gallery')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Gallery</button>
              <button onClick={() => setCurrentPage('partners')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Partners</button>
              <button onClick={() => setCurrentPage('store')} className="text-left text-[#939596] hover:text-[#7bd355] transition-all">Merch Store</button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-xs">
            <h4 className="font-futuristic text-xs font-bold uppercase tracking-wider text-[#e8ecee]">Community Info</h4>
            <ul className="space-y-3 text-[#939596]">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-[#7bd355] shrink-0" />
                <span>Islamia University, Peshawar, PK</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#7bd355] shrink-0" />
                <span>sociapisociety@gmail.com </span> 
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#7bd355] shrink-0" />
                <span>+92 3329984490 </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h4 className="font-futuristic text-xs font-bold uppercase tracking-wider text-[#e8ecee]">Cyber Dispatch</h4>
            <p className="text-[#939596] text-xs leading-relaxed">
              Get notified of upcoming hackathons, tech bootcamps, and volunteer opening rosters.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#333333] rounded-lg py-2.5 pl-3 pr-10 text-xs text-[#e8ecee] focus:outline-none focus:border-[#7bd355] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7bd355] hover:text-[#e8ecee] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-[#7bd355] animate-pulse">
                  ✓ Connection initialized. Subscription confirmed!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Lower Banner */}
        <div className="mt-16 pt-8 border-t border-[#333333] flex flex-col md:flex-row items-center justify-between text-xs text-[#939596]">
          <p>© {new Date().getFullYear()} Sociapi Society. Engineered with 💚 at Islamia University Peshawar.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Founded: Dec 2025</span>
            <span>Est. Members: 30+</span>
            <span>Version: 2.6.0-prod</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
