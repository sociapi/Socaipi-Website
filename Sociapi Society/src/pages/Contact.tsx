import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../data/initialData';

interface ContactProps {
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}

export const Contact: React.FC<ContactProps> = ({ setMessages }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };

    setMessages((prev) => [newMsg, ...prev]);
    setSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => setSuccess(false), 4000);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent("Hello Sociapi Society! I am interested in joining your Sociapi society. Could you share details?");
    window.open(`https://wa.me/+929984490}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-20 relative z-10">
      
      {/* Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Contact Terminal // link_up</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          CONNECT <span className="text-[#7bd355] glow-text">TRANSMISSIONS</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Open a connection channel to the command staff. Submit inquiries or start direct communication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Info Grid Left */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="space-y-6">
            <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">Direct Channels</h3>
            
            <div className="space-y-4">
              <a href="mailto:info@sociapisociety.org" className="flex items-center space-x-3.5 p-4 rounded-xl bg-[#1e1e1e] border border-[#333333] hover:border-[#7bd355]/30 transition-colors">
                <div className="p-2 bg-[#333333] border border-[#939596]/10 text-[#7bd355] rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-[#939596] font-bold">Mail Address</span>
                  <span className="text-xs text-[#e8ecee]">sociapisociety@gmail.com</span>
                </div>
              </a>

              <a href="tel:+923000000000" className="flex items-center space-x-3.5 p-4 rounded-xl bg-[#1e1e1e] border border-[#333333] hover:border-[#7bd355]/30 transition-colors">
                <div className="p-2 bg-[#333333] border border-[#939596]/10 text-[#7bd355] rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-[#939596] font-bold">Hotline Number</span>
                  <span className="text-xs text-[#e8ecee]">+92 3329984490</span>
                </div>
              </a>

              <div className="flex items-center space-x-3.5 p-4 rounded-xl bg-[#1e1e1e] border border-[#333333]">
                <div className="p-2 bg-[#333333] border border-[#939596]/10 text-[#7bd355] rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-[#939596] font-bold">HQ Base Coordinates</span>
                  <span className="text-xs text-[#e8ecee]">Islamia University, Peshawar Campus, PK</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Connection */}
          <div className="glass-panel p-6 rounded-2xl border border-[#7bd355]/20 space-y-4">
            <h4 className="font-futuristic font-bold text-xs uppercase tracking-wider text-[#e8ecee]">WhatsApp Hot Route</h4>
            <p className="text-xs text-[#939596] leading-relaxed">
              Skip email coordinates completely. Connect with community coordinators immediately on WhatsApp for instant guidance.
            </p>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Initiate WhatsApp Chat</span>
            </button>
          </div>

        </div>

        {/* Form Right */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel border border-[#333333] rounded-2xl p-6 md:p-8 space-y-6">
            
            <div className="flex items-center space-x-3 pb-4 border-b border-[#333333]">
              <div className="p-2 rounded-lg bg-[#333333] text-[#7bd355]">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">Terminal Mailbox</h3>
                <p className="text-[9px] text-[#939596] uppercase tracking-widest">Submit structured message queries</p>
              </div>
            </div>

            {success ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
                  ✓
                </div>
                <h4 className="font-futuristic font-bold text-[#e8ecee]">Transmission Successful!</h4>
                <p className="text-xs text-[#939596]">
                  Your communication parameters have been piped to the core database. Roster officer will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Uzair Afridi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Your Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. uzair@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Subject Coordinate</label>
                  <input
                    type="text"
                    placeholder="e.g. Bootcamp Registration Issue"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Message Details</label>
                  <textarea
                    placeholder="Provide full description of your query, feedback, or collaboration details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
                  />
                </div>

                <div className="md:col-span-2 pt-2 flex items-center space-x-2 text-[10px] text-[#939596]">
                  <AlertCircle className="w-4 h-4 text-[#7bd355] shrink-0" />
                  <span>Your submission updates the core CMS panel's live Inbox. Feel free to inspect it.</span>
                </div>

                <button
                  type="submit"
                  className="md:col-span-2 w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Transmit Message Coordinates
                </button>

              </form>
            )}

          </div>

          {/* Black Canvas Map Vector Coordinate Placeholder */}
          <div className="relative rounded-2xl overflow-hidden border border-[#333333] h-64 bg-[#161616] flex flex-col justify-between p-6">
            <div className="absolute inset-0 cyber-grid opacity-30 z-0" />
            <div className="relative z-10">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] font-mono">// GPS RADAR SIGNAL</span>
              <h4 className="font-futuristic font-bold text-[#e8ecee] mt-1">Islamia University, Peshawar Campus</h4>
              <p className="text-[10px] text-[#939596]">Lattitude: 34.0076° N • Longitude: 71.4770° E</p>
            </div>
            
            <div className="relative z-10 flex items-center justify-between text-[9px] text-[#7bd355] font-mono border-t border-[#333333] pt-4">
              <span>SCAN RADAR ACTIVE</span>
              <span>100% SIGNAL STRENGTH</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
